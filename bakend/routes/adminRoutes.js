const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { getAllTasks } = require("../controllers/adminController");

router.get("/tasks", auth, admin, getAllTasks);

module.exports = router;