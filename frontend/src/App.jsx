import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilters from "./components/TaskFilter";
import { fetchTasks, createTask, updateTask, deleteTask } from "./api/taskApi";
import "./App.css";


export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const[filter ,setFilter]= useState("all");
  const[search,setSearch]= useState("");


  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (title) => {
    setError("");
    try {
      const newTask = await createTask(title);
      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggle = async (task) => {
    setError("");
    try {
      const updated = await updateTask(task.id, { completed: !task.completed });
      setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    setError("");
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };


  const visibleTasks = tasks
    .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()))
    .filter((task) => {
      if(filter === "completed") return task.completed;
      if(filter === "pending") return !task.completed;
      return true;
    });

  const handleEdit = async (id,newTitle) => {
  setError("");
  try {
    const updated = await updateTask(id, { title: newTitle });
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  } catch (err) {
    setError(err.message);
  }
};


  return (
    <div className="app">
      <h1>Task Manager</h1>
      <TaskForm onAdd={handleAdd} />
      <TaskFilters
        search={search}
        onSearchCh={setSearch}
        filter={filter}
        onFilterCh={setFilter}
        />
      {error && <p className="error">{error}</p>}
      {loading ? 
        <p>Loading tasks...</p> : (
        <TaskList 
        tasks={tasks} 
        onToggle={handleToggle} 
        onDelete={handleDelete}
        onEdit={handleEdit}/>
      )}
    </div>
  );
}
