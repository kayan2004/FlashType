const {
  getText,
  getTextById,
  getTextByDifficulty,
  createText,
  updateText,
} = require("../services/textService");

const getAllTextsController = async (req, res) => {
  try {
    const texts = await getText();
    res.status(200).json({ texts });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

const getTextByIdController = async (req, res) => {
  const textID = req.params.id;
  try {
    const text = await getTextById(textID);
    res.status(200).json({ text });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

const getTextByDifficultyController = async (req, res) => {
  const difficulty = req.params.difficulty;
  try {
    const text = await getTextByDifficulty(difficulty);
    res.status(200).json({ text });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

const createTextController = async (req, res) => {
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { content, difficulty } = req.body;

  try {
    const response = await createText(content, difficulty);
    res.status(201).json({ response });
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
};

const updateTextController = async (req, res) => {
  const { textID, content, difficulty } = req.body;
  if (!textID) {
    return res.status(400).json({ message: "missing data" });
  }

  try {
    const response = await updateText(textID, content, difficulty);
    res.status(201).json({ response });
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
};

const deleteTextController = async (req, res) => {
  const { textID } = req.body;

  if (!textID) {
    return res.status(400).json({ message: "missing text id" });
  }

  try {
    const result = await deleteTextController(userId);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

module.exports = {
  getAllTextsController,
  getTextByIdController,
  getTextByDifficultyController,
  createTextController,
  updateTextController,
  deleteTextController,
};
