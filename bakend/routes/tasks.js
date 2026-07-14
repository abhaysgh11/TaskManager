const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const validateTask = require("../middleware/validateTaks");
const upload = require("../middleware/upload");
const {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
} = require("../controllers/TasksController");

router.get("/", auth , getAllTasks);
router.get("/:id", auth, getTaskById);
router.post("/", auth , upload.single("file"),validateTask, createTask);
router.put("/:id", auth ,validateTask, updateTask);
router.delete("/:id",auth , deleteTask);

module.exports = router;
