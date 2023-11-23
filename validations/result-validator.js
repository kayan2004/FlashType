const { check } = require("express-validator");

const createResultValidation = [
  check("result_rawSpeed").notEmpty().withMessage("speed is required"),
  check("result_accuracy").notEmpty().withMessage("accuracy is required"),
  check("result_consistency").notEmpty().withMessage("consistency is required"),
  check("result_user_ID").notEmpty().withMessage("user ID is required"),
  check("result_text_ID").notEmpty().withMessage("result ID is required"),
];

const deleteResultValidation = [
  check("result_ID").notEmpty().withMessage("please insert a valid id"),
];
// Exporting the validation middleware for use in other parts of the application
module.exports = {
  createResultValidation,
  deleteResultValidation,
};
