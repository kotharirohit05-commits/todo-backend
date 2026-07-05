const express = require("express")
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const {createStudent , getStudent , getStudentById, updateStudent , deleteStudent , getStudentsWithUser} = require("../controllers/studentController");

router.post("/students" , authMiddleware, createStudent);
router.get(
    "/students-with-user",
    authMiddleware,
    getStudentsWithUser
);
router.get("/students" , authMiddleware, getStudent);
router.get("/students/:id" , authMiddleware, getStudentById);
router.put("/students/:id" ,authMiddleware,  updateStudent);
router.delete("/students/:id" ,authMiddleware,  deleteStudent);
module.exports = router;