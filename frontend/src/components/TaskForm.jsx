import { useState } from "react";

export default function TaskForm({ onAdd }) {
const [title, setTitle] = useState("");
const [file, setFile] = useState(null);

const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title, file);
    setTitle("");
    setFile(null);
    e.target.reset();
};

return (
    <form onSubmit={handleSubmit}>

    <input
        type="text"
        placeholder="Enter Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
    />

    <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
    />

    <button type="submit">
        Add Task
    </button>

    </form>
);
}