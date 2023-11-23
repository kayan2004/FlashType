const {
  getResultById,
  getResultsForUser,
  addResult,
  deleteResult,
  getHighScoreForUser,
  getLeaderBoard,
  getResultsForUser,
} = require("../services/resultService");

const getResultByIdController = async (req, res) => {
  try {
    const resultID = req.params.id;
    const result = await getResultById(resultID);
    res.status(200).json({ results });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};
const getResultsForUserController = async (req, res) => {
  try {
    const UserID = req.params.id;
    const results = await getResultsForUser(UserID);
    res.status(200).json({ results });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

const getHighScoreForUserController = async (req, res) => {
  try {
    const UserID = req.params.id;
    const result = await getHighScoreForUser(UserID);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

const getLeaderBoardController = async (req, res) => {
  try {
    const result = await getLeaderBoard();
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

const addResultController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rawSpeed, accuracy, consistency, userID, textID } = req.body;

  try {
    const response = await addResult(
      rawSpeed,
      accuracy,
      consistency,
      userID,
      textID
    );
    res.status(201).json({ response });
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
};

const updateResultController = async (req, res) => {
  const { resultID, rawSpeed, accuracy, consistency, userID, textID } =
    req.body;
  if (!resultID) {
    return res.status(400).json({ message: "missing data" });
  }

  try {
    const response = await updateUser(
      resultID,
      rawSpeed,
      accuracy,
      consistency,
      userID,
      textID
    );
    res.status(201).json({ response });
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
};

const deleteResultController = async (req, res) => {
  const { resultID } = req.body;

  if (!resultID) {
    return res.status(400).json({ message: "missing user id" });
  }

  try {
    const result = await deleteResult(resultID);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

module.exports = {
  getHighScoreForUserController,
  getResultByIdController,
  getResultsForUserController,
  getLeaderBoardController,
  addResultController,
  updateResultController,
  deleteResultController,
};
