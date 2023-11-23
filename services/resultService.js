const { query } = require("../database/db");

/**
 *
 * Retrieves all results from the database
 * @returns result
 */
const getResultById = async (id) => {
  try {
    // this is the native sql for getting a result by id
    let sql = `SELECT * FROM results WHERE result_ID=?`;
    const result = await query(sql, [id]);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
/**
 *
 * @param {number} id
 * Retrieves a results by their ID from the database
 * @returns result
 */
const getResultsForUser = async (resutlID) => {
  try {
    let sql = `SELECT * FROM results WHERE user_ID=?`;
    const result = await query(sql, [resutlID]);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 *
 * Retrieves highScore from the database by ID
 * @returns speed
 */
const getHighScoreForUser = async (userID) => {
  try {
    let sql = `SELECT max(result_rawSpeed) FROM results WHERE user_ID=?`;
    const speed = await query(sql, [userID]);
    return speed;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 *
 * Retrieves leaderBoard from the database by ID
 * @returns query
 */
const getLeaderBoard = async () => {
  try {
    let sql = `SELECT user_UserName, result_rawSpeed
        FROM users NATURAL JOIN Results
        GROUP BY rawSpeed
        ORDER BY DESC`;
    const leaderBoard = await query(sql);
    return leaderBoard;
  } catch (error) {
    throw new Error(error);
  }
};
/**
 *
 * @param {Number} rawSpeed
 * @param {Number} accuracy
 * @param {Number} consistency
 * @param {Number} userID
 * @param {Number} textID
 * add a new result in the database
 * @returns result
 */
const addResult = async (rawSpeed, accuracy, consistency, userID, textID) => {
  try {
    let sql = `INSERT INTO results
        (results_rawSpeed , results_accuracy, results_consistency,
           results_user_ID, results_text_ID) 
        VALUES
        (?,?,?,?,?);
        `;
    const result = await query(sql, [
      rawSpeed,
      accuracy,
      consistency,
      userID,
      textID,
    ]);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 *
 * @param {number} id
 * Deletes a results from the database by their ID
 * @returns query
 */
const deleteResult = async (id) => {
  try {
    return await query(`DELETE FROM results WHERE result_ID = ?`, [id]);
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = {
  getResultById,
  getResultsForUser,
  addResult,
  deleteResult,
  getHighScoreForUser,
  getLeaderBoard,
};
