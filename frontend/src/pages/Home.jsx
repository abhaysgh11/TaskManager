// import { useEffect, useState } from "react";
// import TaskForm from "../components/TaskForm";
// import TaskList from "../components/TaskList";
// import TaskFilters from "../components/TaskFilter";
// import { fetchTasks, createTask, updateTask, deleteTask } from "../api/taskApi";
// import "../App.css";

// export default function Home() {
//     const [tasks, setTasks] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");
//     const[filter ,setFilter]= useState("all");
//     const[search,setSearch]= useState("");
    
    
//     useEffect(() => {
//         loadTasks();
//     }, []);
    
//     const loadTasks = async () => {
//         setLoading(true);
//         setError("");
//         try {
//         const data = await fetchTasks();
//         setTasks(data);
//         } catch (err) {
//         setError(err.message);
//         } finally {
//         setLoading(false);
//         }
//     };
    
//     const handleAdd = async (title, file) => {
//         setError("");
//         try {
//             const formData = new FormData();
//             formData.append("title", title);
//             if (file) {
//             formData.append("file", file);
//             }
//             const newTask = await createTask(formData);
//             setTasks((prev) => [...prev, newTask]);
//         } catch (err) {
//             setError(err.message);}
//         };
    
//     const handleToggle = async (task) => {
//         setError("");
//         try {
//         const updated = await updateTask(task._id, { completed: !task.completed });
//         setTasks((prev) => prev.map((t) => (t._id === task._id ? updated : t)));
//         } catch (err) {
//         setError(err.message);
//         }
//     };
    
//     const handleDelete = async (id) => {
//         setError("");
//         try {
//         await deleteTask(id);
//         setTasks((prev) => prev.filter((t) => t._id !== id));
//         } catch (err) {
//         setError(err.message);
//         }
//     };
    
    
//     const visibleTasks = tasks
//         .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()))
//         .filter((task) => {
//         if(filter === "completed") return task.completed;
//         if(filter === "pending") return !task.completed;
//         return true;
//         });
    
//     const handleEdit = async (id,newTitle) => {
//     setError("");
//     try {
//         const updated = await updateTask(id, { title: newTitle });
//         setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
//     } catch (err) {
//         setError(err.message);
//     }
//     };
    
    
//     return (
//         <div className="app">
//         <h1>Task Manager</h1>
//         <TaskForm onAdd={handleAdd} />
//         <TaskFilters
//             search={search}
//             onSearchCh={setSearch}
//             filter={filter}
//             onFilterCh={setFilter}
//             />
//         {error && <p className="error">{error}</p>}
//         {loading ? 
//             <p>Loading tasks...</p> : (
//             <TaskList 
//             tasks={visibleTasks} 
//             onToggle={handleToggle} 
//             onDelete={handleDelete}
//             onEdit={handleEdit}/>
//         )}
//         </div>
//     );


// }

import { useEffect, useState } from "react";
import {
  FaSearch,
  FaPaperclip,
  FaCheck,
  FaEdit,
  FaTrash,
  FaClipboardList,
  FaSignOutAlt,
  FaPlus,
} from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../api/taskApi";

export default function Home() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [title, setTitle] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);

    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {

    e.preventDefault();

    if (!title.trim()) return;

    try {

      const formData = new FormData();

      formData.append("title", title);

      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      const newTask = await createTask(formData);

      setTasks((prev) => [...prev, newTask]);

      setTitle("");

      setSelectedFile(null);

      e.target.reset();

    } catch (err) {

      setError(err.message);

    }

  };

  const handleToggle = async (task) => {

    try {

      const updated = await updateTask(task._id, {
        completed: !task.completed,
      });

      setTasks((prev) =>
        prev.map((t) =>
          t._id === task._id ? updated : t
        )
      );

    } catch (err) {

      setError(err.message);

    }

  };

  const handleDelete = async (id) => {

    try {

      await deleteTask(id);

      setTasks((prev) =>
        prev.filter((t) => t._id !== id)
      );

    } catch (err) {

      setError(err.message);

    }

  };

  const handleEdit = async (task) => {

    const newTitle = prompt(
      "Edit Task",
      task.title
    );

    if (!newTitle) return;

    try {

      const updated = await updateTask(task._id, {
        title: newTitle,
      });

      setTasks((prev) =>
        prev.map((t) =>
          t._id === task._id ? updated : t
        )
      );

    } catch (err) {

      setError(err.message);

    }

  };

  const visibleTasks = tasks.filter((task) =>
    task.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-100">

  {/* NAVBAR */}

  <nav className="bg-white shadow-md">

    <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

      <div className="flex items-center gap-3">

        <div className="bg-blue-600 p-3 rounded-xl">

          <FaClipboardList className="text-white text-2xl" />

        </div>

        <div>

          <h1 className="text-2xl font-bold text-slate-800">
            Task Manager
          </h1>

          <p className="text-gray-500 text-sm">
            Organize your work
          </p>

        </div>

      </div>

      <div className="flex items-center gap-5">

        <div className="text-right">

          <h2 className="font-semibold text-slate-700">
            {user?.name}
          </h2>

          <p className="text-gray-500 text-sm">
            {user?.role}
          </p>

        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 transition"
        >

          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </div>

  </nav>

  <div className="max-w-7xl mx-auto px-8 py-8">

    {/* WELCOME */}

    <div className="mb-8">

      <h2 className="text-4xl font-bold text-slate-800">

        Good Afternoon 👋

      </h2>

      <p className="text-gray-500 mt-2">

        Manage your daily tasks efficiently.

      </p>

    </div>

    {/* ADD TASK */}

    <div className="bg-white rounded-2xl shadow p-6 mb-8">

      <h2 className="text-xl font-semibold mb-5">

        Add New Task

      </h2>

      <form
        onSubmit={handleAdd}
        className="space-y-5"
      >

        <input
          type="text"
          placeholder="Enter task title..."
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="file"
          onChange={(e) =>
            setSelectedFile(
              e.target.files[0]
            )
          }
        />

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl flex items-center gap-2 transition"
        >

          <FaPlus />

          Add Task

        </button>

      </form>

    </div>

    <div className="bg-white rounded-2xl shadow p-5 mb-8">

      <div className="relative">

        <FaSearch
          className="absolute left-4 top-4 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full border rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

    </div>
    <div className="bg-white rounded-2xl shadow overflow-hidden">

    

      <div className="grid grid-cols-12 bg-slate-50 border-b font-semibold text-slate-700 px-6 py-4">

        <div className="col-span-5">
          Task
        </div>

        <div className="col-span-4">
          Attachment
        </div>

        <div className="col-span-3 text-center">
          Actions
        </div>

      </div>

      {/* Loading */}

      {loading && (

        <div className="text-center py-8">

          Loading Tasks...

        </div>

      )}

      {/* Error */}

      {error && (

        <div className="text-center text-red-600 py-8">

          {error}

        </div>

      )}

      {/* Empty */}

      {!loading && visibleTasks.length === 0 && (

        <div className="text-center py-10 text-gray-500">

          No Tasks Found

        </div>

      )}

      {/* Rows */}

      {!loading &&
        visibleTasks.map((task) => (

          <div
            key={task._id}
            className="grid grid-cols-12 items-center px-6 py-4 border-b hover:bg-slate-50 transition"
          >


            <div className="col-span-5">

              <p
                className={`font-medium ${
                  task.completed
                    ? "line-through text-gray-400"
                    : "text-slate-800"
                }`}
              >
                {task.title}
              </p>

            </div>


            <div className="col-span-4">

              {task.filePath ? (

                <a
                  href={`http://localhost:5001/uploads/${task.filePath}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                >

                  <FaPaperclip />

                  {task.fileName}

                </a>

              ) : (

                <span className="text-gray-400">
                  No File
                </span>

              )}

            </div>

            <div className="col-span-3 flex justify-center gap-6">

              <button
                onClick={() => handleToggle(task)}
                className="text-green-600 hover:scale-110 transition"
                title="Complete"
              >

                <FaCheck />

              </button>

              <button
                onClick={() => handleEdit(task)}
                className="text-yellow-500 hover:scale-110 transition"
                title="Edit"
              >

                <FaEdit />

              </button>

              <button
                onClick={() => handleDelete(task._id)}
                className="text-red-600 hover:scale-110 transition"
                title="Delete"
              >

                <FaTrash />

              </button>

            </div>

          </div>

        ))}
            </div>

    {/* Footer */}

    <div className="mt-10 text-center text-gray-500 text-sm">
      © {new Date().getFullYear()} Task Manager • Built with React, Redux Toolkit & MongoDB
    </div>

  </div>

</div>

  );
}