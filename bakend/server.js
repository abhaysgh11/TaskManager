const express = require("express");
const cors = require("cors");
const tasksRouter = require("./routes/tasks.js");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
    next();
});

app.get("/", (req, res) => {
    res.json({ message: "Task Manager API is running" });
});

app.use("/tasks", tasksRouter);

app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
    console.log(`Task Manager API running on http://localhost:${PORT}`);
});