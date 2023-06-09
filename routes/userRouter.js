const express = require("express");
const { signup, login, editUser } = require("../controllers/userController");
const {
  signupValidation,
  checkValidation,
} = require("../middlewares/validationMiddleware");
const { upload } = require("../utils/multer");
const { protectToken } = require("../middlewares/protectTokenMiddleware");

const router = express.Router();

router.post("/signup",upload.single('avatar'), signupValidation, checkValidation, signup);
router.post("/login", login);

router.use(protectToken)

router.patch('/edit',upload.single('avatar'),  editUser)

module.exports = { userRoutes: router };
