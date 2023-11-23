const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const {
  getUsers,
  insertUser,
  updateUser,
  authenticate,
  getUserById,
} = require("../services/userService");

const authenticateController = async (req, res) => {
  const { username, password } = req.body;
  if (!username) {
    return res.status(401).json({ message: "missing data" });
  }

  const result = await authenticate(username, password);
  if (!result) {
    return res.status(401).json({ message: "Wrong user/pass" });
  }

  const token = jwt.sign({ userId: result?.user_id }, process.env.SECRET_KEY);
  res.status(200).json({ message: "authenticated", user: result, token });
};

const getAllUsersController = async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

const getUserByIdController = async (req, res) => {
  const user_id = req.params.id;
  try {
    const user = await getUserById(user_id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

const insertUserController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userName, userEmail, userUserName, userPassword } = req.body;

  try {
    const response = await insertUser(
      userName,
      userEmail,
      userUserName,
      userPassword
    );
    res.status(201).json({ response });
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
};

const updateUserController = async (req, res) => {
  const { userId, userName, userEmail, userUserName, userPassword } = req.body;
  if (!userId) {
    return res.status(400).json({ message: "missing data" });
  }

  try {
    const response = await updateUser(
      userId,
      userName,
      userEmail,
      userUserName,
      userPassword
    );
    res.status(201).json({ response });
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
};

const deleteUserController = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "missing user id" });
  }

  try {
    const result = await deleteUser(userId);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

module.exports = {
  getAllUsersController,
  getUserByIdController,
  insertUserController,
  updateUserController,
  deleteUserController,
  authenticateController,
};
