const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

const { createTodo,
        getTodos,
        getTodoById,
        updateTodo,
        deleteTodo } = require("../controllers/todoController");

router.post("/todos", authMiddleware, createTodo);
router.get("/todos", authMiddleware, getTodos);
router.get("/todos/:id", authMiddleware, getTodoById);
router.put("/todos/:id", authMiddleware, updateTodo);
router.delete("/todos/:id", authMiddleware, deleteTodo);





module.exports = router;