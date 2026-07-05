const express = require("express")
const router = express.Router();

const {getUsers, registerUser, loginUser, getProfile} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/users" , getUsers);
router.post("/register",registerUser );
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getProfile);

module.exports = router 