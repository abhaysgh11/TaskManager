import { useState } from "react";

export default function TaskItem({task,onToggle,onDelete, onEdit}){
const [isEditing, setIsEditing] = useState(false);
const [editTitle, setEditTitle] = useState(task.title);
const [error, setError] = useState("");

const handleSave = () => {
    if (editTitle.trim().length < 3) {
    setError("Title must be at least 3 characters.");
    return;
    }
    
    onEdit(task.id, editTitle.trim());
    setIsEditing(false);
    setError("");
};

const handleCancel = () => {
    setEditTitle(task.title);
    setIsEditing(false);
    setError("");
};

if (isEditing) {
    return (
    <li className="task-item">
        <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            autoFocus
        />
        <div className="task-actions">
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
        </div>
        {error && <p className="error">{error}</p>}
    </li>
    );
}

return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
    <span onClick={() => onToggle(task)} className="task-title">
        {task.title}
    </span>
    <div className="task-actions">
        <button onClick={() => onToggle(task)}>
        {task.completed ? "Undo" : "Mark"}
        </button>
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
    </li>
);
}