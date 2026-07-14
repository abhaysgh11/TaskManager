const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema(
    {title: {
            type: String,
            required: true,
            trim: true,
        },

        completed: {
            type: Boolean,
            default: false,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        fileName:{
            type: String,
            default:"",
        },
        filePath:{
            type: String,
            default:"",
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Task", taskSchema);