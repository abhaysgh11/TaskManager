const { v4: uuidv4 } = require("uuid");
const store = require("../data/tasks");

// GET /tasks
function getAllTasks(req, res) {
    res.status(200).json(store.getAll());
}

function getTaskById(req, res) {
    const task = store.getById(req.params.id);
    if (!task) {
    return res.status(404).json({ error: "Task not found." });
    }
    res.status(200).json(task);
}

function createTask(req, res) {
  const now = new Date().toISOString();
  const newTask = {
    id: uuidv4(),
    title: req.body.title.trim(),
    completed: false,
    createdAt: now,
    updatedAt: now,
  };
  store.add(newTask);
  res.status(201).json(newTask);
}



function updateTask(req, res) {
  const existing = store.getById(req.params.id);
  if (!existing) {
    return res.status(404).json({ error: "Task not found." });
  }

  const updates = {};
  if (req.body.title !== undefined) updates.title = req.body.title.trim();
  if (req.body.completed !== undefined) updates.completed = Boolean(req.body.completed);

  const updated = store.update(req.params.id, updates);
  res.status(200).json(updated);
}


function deleteTask(req, res) {
    const existing = store.getById(req.params.id);
    if (!existing){
    return res.status(404).json({ error: "Task not found." });}
    store.remove(req.params.id);
    res.status(204).send();
}

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
};