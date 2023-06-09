const { body, validationResult } = require("express-validator");

const signupValidation = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage({ code: 1001, msg: "Email is invalid" }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage({ code: 1002, msg: "Password must be at least 8 characters" }),
];

const checkValidation = (req, res, next) => {
  const errors = validationResult(req);

  const msg = errors.array().map(({ msg }) => msg);

  if (!errors.isEmpty()) {
    return res.status(400).json({ status: "fail", msg });
  }

  next();
};

module.exports = { signupValidation, checkValidation };
