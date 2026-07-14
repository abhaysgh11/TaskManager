import { useEffect, useState } from "react";
import api from "../services/api";

export default function Admin() {
const [tasks, setTasks] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
    fetchAllTasks();
}, []);

const fetchAllTasks = async () => {
    try {
    const response = await api.get("/admin/tasks");
    setTasks(response.data.tasks);
    } catch (err) {
    console.error(err);
    alert("Failed to load tasks");
    } finally {
    setLoading(false);
    }
};

if (loading) {
    return <h2>Loading...</h2>;
}

return (
    <div style={{ padding: "20px" }}>
    <h1>AllTaska</h1>

    <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
        <thead>
        <tr>
            <th>User</th>
            {/* <th>Email</th> */}
            <th>Task</th>
            <th>Status</th>
        </tr>
        </thead>

        <tbody>
        {tasks.map((task) => (
            <tr key={task._id}>
            <td>{task.user?.name}</td>
            {/* <td>{task.user?.email}</td> */}
            <td>{task.title}</td>
            <td>{task.completed ? "Completed" : "Pending"}</td>
            </tr>
        ))}
        </tbody>
    </table>
    </div>
);
}