
const Task = require("../models/Tasks");

exports.getAllTasks = async (req, res) => {

    try {

        const tasks = await Task.find({
            user: req.user.id
        });

        res.status(200).json(tasks);

    }
    catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user.id
        });
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
exports.createTask = async(req,res)=> {
    try {
        const { title }=req.body;
        const task = await Task.create({
        title,
        user: req.user.id,
        fileName: req.file ? req.file.originalname : "",
        filePath: req.file ? req.file.path : ""

        });
        res.status(201).json(task);
    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }
};

exports.updateTask = async (req, res) => {

    try {
        const task = await Task.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.id
            },
            req.body,
            {
                new: true
            }
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }
        res.json(task);
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }
        res.json({
            success: true,
            message: "Task Deleted"
        });

    }

    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }

};
