const express = require("express");
const {
  getAllTextsController,
  getTextByIdController,
  getTextByDifficultyController,
  createTextController,
  updateTextController,
  deleteTextController,
} = require("../controllers/textsController");

const {
  createTextValidation,
  updateTextValidation,
  deleteTextValidation,
} = require("../validations/text-validator");
const router = express.Router();

router.get("/texts", getAllTextsController);
router.get("/textid/:id", getTextByIdController);
router.get("/textdifficulty/:difficulty", getTextByDifficultyController);
router.post("/createtext", createTextValidation, createTextController);
router.put("/updatetext", updateTextValidation, updateTextController);
router.delete("/deletetext/:id", deleteTextValidation, deleteTextController);

module.exports = router;
