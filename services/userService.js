const { query } = require("../database/db");

const authenticate = async (username, password) => {
  try {
    let sql = `select * from users where user_username = ?
        and user_password = ?`;
    const user = await query(sql, [username, password]);
    return user[0];
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * Retrieves all users from the database.
 *
 * @returns {users} An array of user objects.
 */
const getUsers = async () => {
  try {
    let sql = `select * from users`;
    const users = await query(sql);
    return users;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Retrieves a specific user by their user ID.
 *
 * @param {number} id The ID of the user to retrieve.
 * @returns {user} A user object if found.
 */
const getUserById = async (id) => {
  try {
    let sql = `SELECT * FROM users WHERE user_ID = ?`;
    const user = await query(sql, [id]);
    return user;
  } catch (error) {
    throw new Error(error);
  }
};
/**
 *
 * @param {String} userName
 * @param {String} userEmail
 * @param {String} userUserName
 * @param {String} userPassword
 * Insert a user into the database
 * @returns User
 */
const insertUser = async (userName, userEmail, userUserName, userPassword) => {
  try {
    let sql = `INSERT INTO users 
    (user_name, user_username, user_email, user_password)
    VALUES
    (?, ?, ?, ?);
    `;
    const result = await query(sql, [
      userName,
      userUserName,
      userEmail,
      userPassword,
    ]);
    let insertedUser = await query("select * from users where user_id = ?", [
      result?.insertId,
    ]);
    return insertedUser;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Updates an existing user in the database.
 *
 * @param {number} user_id The ID of the user to update.
 * @param {string} user_password New password of the user.
 * @param {string} user_username New username of the user.
 * @param {string} user_name New name of the user.
 * @param {string} user_email New email of the user.
 * @returns {result} The result of the update operation.
 */
const updateUser = async (user) => {
  try {
    const { user_id, user_name, user_username, user_email, user_password } =
      user;

    let sql = `UPDATE user SET 
    user_username = ?, 
    user_name = ?, 
    user_email = ?,
    user_password = ?,
    WHERE user_id = ?;
    `;

    const result = await query(sql, [
      user_username,
      user_name,
      user_email,
      user_password,
      user_id,
    ]);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Deletes a user from the database based on their ID.
 *
 * @param {number} id The ID of the user to delete.
 * @returns {Promise} The result of the delete operation.
 */
const deleteUser = async (id) => {
  try {
    return await query("DELETE FROM users WHERE user_id = ?", [id]);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  insertUser,
  updateUser,
  deleteUser,
  authenticate,
};
