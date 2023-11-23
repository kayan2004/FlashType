const { check } = require("express-validator");

const createTextValidation = [
  check("text_content").notEmpty().withMessage("content is required"),
  check("text_difficulty").notEmpty().withMessage("difficulty is required"),
];

const updateTextValidation = [
  check("text_ID").notEmpty().withMessage("ID is required"),
  check("text_content").notEmpty().withMessage("content is required"),
  check("text_difficulty").notEmpty().withMessage("difficulty is required"),
];
const deleteTextValidation = [
  check("text_ID").notEmpty().withMessage("please insert a valid id"),
];

module.exports = {
  createTextValidation,
  updateTextValidation,
  deleteTextValidation,
};
