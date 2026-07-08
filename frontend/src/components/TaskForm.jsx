import { useState } from "react";

export default function TaskForm({ onAdd }) {
const [title, setTitle] = useState("");
const [localError, setLocalError] = useState("");

const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim().length < 3) {
    setLocalError("Title must be at least 3 characters.");
    return;
    }
    setLocalError("");
    onAdd(title.trim());
    setTitle("");
};

return (
    <form onSubmit={handleSubmit} className="task-form">
    <input
        type="text"
        placeholder="Enter Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
    />
    <button type="submit">Add</button>
    {localError && <p className="error">{localError}</p>}
    </form>
);
}