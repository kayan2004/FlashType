const express = require("express");
const {
  getAllUsersController,
  insertUserController,
  updateUserController,
  deleteUserController,
  authenticateController,
  getUserByIdController,
} = require("../controllers/userController");

const {
  insertUserValidation,
  updateUserValidation,
  deleteUserValidation,
} = require("../validations/user-validator");
const authenticateToken = require("./middleware");
const router = express.Router();

router.post("/authenticate", authenticateController);
router.get("/users", authenticateToken, getAllUsersController);
router.get("/findbyid/:id", getUserByIdController);
router.post("/insertuser", insertUserValidation, insertUserController);
router.put("/updateuser", updateUserValidation, updateUserController);
router.delete("/deleteuser/:id", deleteUserValidation, deleteUserController);

module.exports = router;
