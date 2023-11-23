const express = require("express");
const {
  getHighScoreForUserController,
  getResultByIdController,
  getResultsForUserController,
  getLeaderBoardController,
  addResultController,
  deleteResultController,
} = require("../controllers/resultsController");

const {
  createResultValidation,
  deleteResultValidation,
} = require("../validations/result-validator");
const router = express.Router();

router.get("/findbyid:id", getResultByIdController);
router.get("/highscore/:id", getHighScoreForUserController);
router.get("/leaderboard", getLeaderBoardController);
router.get("/findbyuserid/:id", getResultsForUserController);
router.post("/addResult", createResultValidation, addResultController);
router.delete(
  "/deleteResult/:id",
  deleteResultValidation,
  deleteResultController
);

module.exports = router;
