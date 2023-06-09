const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/userModel");
const { storage } = require("../utils/firebase");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");

dotenv.config({ path: "./.env" });

const signup = async (req, res) => {
  const { password, username, email } = req.body;

  const user = await User.findOne({ where: { username, email } });

  if (user) {
    return res
      .status(400)
      .json({ status: "fail", message: "usuario ya existe" });
  }

  const imgRef = ref(storage, `daniel-node/avatars/${req.file.originalname}`);
  await uploadBytes(imgRef, req.file.buffer);
  const urlImg = await getDownloadURL(imgRef);

  req.body.avatar = urlImg

  const salt = await bcrypt.genSaltSync(14);
  const hashedPassword = await bcrypt.hash(password, salt);

  req.body.password = hashedPassword;

  const newUser = await User.create(req.body);

  newUser.password = undefined;

  res.status(200).json({ status: "success", newUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res
      .status(404)
      .json({ status: "fail", message: "Credentials invalid" });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  user.password = undefined;

  res.status(200).json({ status: "success", token, user });
};

const editUser = async (req,res) => {
  const { username } = req.body
  const avatar = req.file
  const userId = req.user

  const user = await User.findOne({ where:{id:userId} })  


  if(!user){
    return  res.status(404).json({ status:'fail', message: "No se encontro el usuario" })
  }

  
  if(username){
    user.username = username
  }

  if(avatar){
    const imgRef = ref(storage, `daniel-node/avatars/${req.file.originalname}`);
    await uploadBytes(imgRef, req.file.buffer);
    const urlImg = await getDownloadURL(imgRef);
    user.avatar = urlImg
  }


  const userEdit = await user.save()

  userEdit.password = undefined

  res.status(200).json({userEdit})
}

module.exports = { signup, login, editUser };
