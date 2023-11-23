const { query } = require("../database/db");

/**
 * Retrieves all texts from the database.
 *
 * @returns {texts} An array of text objects.
 */
const getText = async () => {
  try {
    let sql = `select * from texts`;
    const texts = await query(sql);
    return texts;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Retrieves text from the database by id
 * @param {number} id The ID of the text to retrieve.
 * @returns query.
 */
const getTextById = async (id) => {
  try {
    let sql = `SELECT * FROM texts WHERE text_ID = ?`;
    const text = await query(sql, [id]);
    return text;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Retrieves text from the database by difficulty
 * @param {String} difficulty The difficulty of the text to retrieve.
 * @returns query.
 */
const getTextByDifficulty = async (difficulty) => {
  try {
    let sql = `SELECT * FROM texts WHERE text_difficulty =?`;
    const result = await query(sql, [difficulty]);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getDifficulty = async()=>{
  try{
    let sql = `select distinct difficulty from texts`;
    const result = await query(sql);
    return result;
  }catch(error){
    throw new Error(error)
  }
}

/**
 *
 * @param {String} content
 * @param {String} difficulty
 * create new text in the database
 * @returns result
 */
const createText = async (content, difficulty) => {
  try {
    // native insert query
    let sql = `INSERT INTO texts 
        (text_content, text_difficulty)
        VALUES
        (?, ?);
        `;
    const result = await query(sql, [content, difficulty]);
    let insertedText = await query("select * from texts where text_id = ?", [
      result?.insertId,
    ]);
    return insertedText;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * @param {Number} id
 * @param {String} content
 * @param {String} difficulty
 * update new text in the database
 * @returns result
 */
const updateText = async (id) => {
  try {
    const { text_ID, text_content, text_difficulty } = id;

    let sql = `UPDATE texts SET 
    text_content = ?, 
    text_difficulty = ?, 
    WHERE text_ID = ?;
    `;

    const result = await query(sql, [text_content, text_difficulty, text_ID]);
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Deletes a text from the database based on their ID.
 *
 * @param {number} id The ID of the text to delete.
 * @returns {Promise} The result of the delete operation.
 */
const deleteText = async (id) => {
  try {
    return await query("DELETE FROM texts WHERE text_ID = ?", [id]);
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = {
  getText,
  getTextById,
  getTextByDifficulty,
  createText,
  updateText,
  deleteText,
};
