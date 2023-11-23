const { check } = require("express-validator");

const insertUserValidation = [
  check("user_id").notEmpty().withMessage("User Id is required"),
  check("user_name").notEmpty().withMessage("User Name is required"),
  check("user_userName").notEmpty().withMessage("User Username is required"),
  check("user_email").isEmail().withMessage("Invalid Email Format"),
  check("user_password").notEmpty().withMessage("User Password is required"),
  check("user_password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 6 characters long"),
  check("user_password")
    .isStrongPassword()
    .withMessage("You entered a weak pwd"),
];

const updateUserValidation = [
  check("user_ID").notEmpty().withMessage("User Id is required"),
  check("user_name").notEmpty().withMessage("User Name is required"),
  check("user_username").notEmpty().withMessage("User Username is required"),
  check("user_email").isEmail().withMessage("Invalid Email Format"),
  check("user_password").notEmpty().withMessage("User Password is required"),
  check("user_password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 6 characters long"),
  check("user_password")
    .isStrongPassword()
    .withMessage("You entered a weak pwd"),
];
const deleteUserValidation = [
  check("user_ID").notEmpty().withMessage("please insert a valid id"),
];

module.exports = {
  insertUserValidation,
  updateUserValidation,
  deleteUserValidation,
};
