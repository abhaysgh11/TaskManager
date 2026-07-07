const express = require("express");
const router = express.Router();
const validateTask = require("../middleware/validateTaks");
const {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
} = require("../controllers/TasksController");

router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.post("/", validateTask, createTask);
router.put("/:id", validateTask, updateTask);
router.delete("/:id", deleteTask);

module.exports = router;