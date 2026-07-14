const Task = require("../models/Tasks");

exports.getAllTasks = async (req, res) => {
try {
    const tasks = await Task.find()
    .populate("user", "name email")
    .sort({createdAt: -1});

    res.status(200).json({
    success: true,
    tasks,
    });
} catch (err) {
    res.status(500).json({
    success: false,
    message: err.message,
    });
}
};