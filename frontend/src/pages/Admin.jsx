// import { useEffect, useState } from "react";
// import api from "../services/api";

// export default function Admin() {
// const [tasks, setTasks] = useState([]);
// const [loading, setLoading] = useState(true);

// useEffect(() => {
//     fetchAllTasks();
// }, []);

// const fetchAllTasks = async () => {
//     try {
//     const response = await api.get("/admin/tasks");
//     setTasks(response.data.tasks);
//     } catch (err) {
//     console.error(err);
//     alert("Failed to load tasks");
//     } finally {
//     setLoading(false);
//     }
// };

// if (loading) {
//     return <h2>Loading...</h2>;
// }

// return (
//     <div style={{ padding: "20px" }}>
//     <h1>AllTaska</h1>

//     <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
//         <thead>
//         <tr>
//             <th>User</th>
//             {/* <th>Email</th> */}
//             <th>Task</th>
//             <th>Status</th>
//         </tr>
//         </thead>

//         <tbody>
//         {tasks.map((task) => (
//             <tr key={task._id}>
//             <td>{task.user?.name}</td>
//             {/* <td>{task.user?.email}</td> */}
//             <td>{task.title}</td>
//             <td>{task.completed ? "Completed" : "Pending"}</td>
//             </tr>
//         ))}
//         </tbody>
//     </table>
//     </div>
// );
// }

// import { useEffect, useState } from "react";
// import {
// FaClipboardList,
// FaSearch,
// FaSignOutAlt,
// FaPaperclip,
// } from "react-icons/fa";

// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../features/auth/authSlice";
// import { useNavigate } from "react-router-dom";

// import api from "../services/api";

// export default function Admin() {

// const [tasks, setTasks] = useState([]);
// const [loading, setLoading] = useState(true);
// const [search, setSearch] = useState("");

// const dispatch = useDispatch();
// const navigate = useNavigate();

// const { user } = useSelector((state) => state.auth);

// useEffect(() => {
//     fetchAllTasks();
// }, []);

// const fetchAllTasks = async () => {

//     try {

//     const response = await api.get("/admin/tasks");

//     setTasks(response.data.tasks);

//     } catch (err) {

//     console.error(err);

//     alert("Failed to load tasks");

//     } finally {

//     setLoading(false);

//     }

// };

// const handleLogout = () => {

//     dispatch(logout());

//     navigate("/");

// };

// const visibleTasks = tasks.filter((task) =>
//     task.title
//     .toLowerCase()
//     .includes(search.toLowerCase())
// );

// if (loading) {

//     return (
//     <div className="min-h-screen flex items-center justify-center text-2xl">
//         Loading...
//     </div>
//     );

// }

// return (

// <div className="min-h-screen bg-slate-100">

// <nav className="bg-white shadow-md">

// <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

// <div className="flex items-center gap-3">

// <div className="bg-blue-600 p-3 rounded-xl">

// <FaClipboardList className="text-white text-2xl"/>

// </div>

// <div>

// <h1 className="text-2xl font-bold">

// Admin Dashboard

// </h1>

// <p className="text-gray-500">
// {/* Task Management System */}
// </p>
// </div>
// </div><div className="flex items-center gap-5">
// <div className="text-right">
// <p className="font-semibold">
// {user?.name}
// </p>
// <p className="text-gray-500 text-sm">
// Administrator
// </p>
// </div>
// <button
// onClick={handleLogout}
// className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg flex items-center gap-2"
// >
// <FaSignOutAlt/>
// Logout
// </button>
// </div>
// </div>
// </nav>
// <div className="max-w-7xl mx-auto px-8 py-8">
// <h2 className="text-3xl font-bold">
// Welcome Admin
// </h2>
// <p className="text-gray-500 mt-2">

// Monitor all user tasks from one place.

// </p>
// <div className="bg-white rounded-2xl shadow p-5 mt-8">
// <div className="relative">
// <FaSearch className="absolute left-4 top-4 text-gray-400"/>
// <input
// type="text"
// placeholder="Search Task..."
// value={search}
// onChange={(e)=>setSearch(e.target.value)}
// className="w-full border rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
// />
// </div>
// </div>

// <div className="bg-white rounded-2xl shadow mt-8 overflow-hidden">

// <div className="grid grid-cols-12 bg-slate-50 border-b px-6 py-4 font-semibold text-slate-700">

//     <div className="col-span-3">
//     User
//     </div>

//     <div className="col-span-4">
//     Task
//     </div>

//     <div className="col-span-3">
//     Attachment
//     </div>

//     <div className="col-span-2 text-center">
//     Status
//     </div>

// </div>

// {visibleTasks.length === 0 ? (

//     <div className="text-center py-10 text-gray-500">

//     No Tasks Found

//     </div>

// ) : (

//     visibleTasks.map((task) => (

//     <div
//         key={task._id}
//         className="grid grid-cols-12 items-center px-6 py-4 border-b hover:bg-slate-50 transition"
//     >

//         {/* USER */}

//         <div className="col-span-3">

//         <p className="font-semibold text-slate-700">

//             {task.user?.name}

//         </p>

//         <p className="text-sm text-gray-500">

//             {task.user?.email}

//         </p>

//         </div>

//         {/* TASK */}

//         <div className="col-span-4">

//         <p className="font-medium">

//             {task.title}

//         </p>

//         </div>

//         {/* FILE */}

//         <div className="col-span-3">

//         {task.filePath ? (

//             <a
//             href={`http://localhost:5001/uploads/${task.filePath}`}
//             target="_blank"
//             rel="noreferrer"
//             className="flex items-center gap-2 text-blue-600 hover:underline"
//             >

//             <FaPaperclip />

//             {task.fileName}

//             </a>

//         ) : (

//             <span className="text-gray-400">

//             No File

//             </span>

//         )}

//         </div>

//         {/* STATUS */}

//         <div className="col-span-2 text-center">

//         {task.completed ? (

//             <span className="text-green-600 font-semibold">

//             Completed

//             </span>

//         ) : (

//             <span className="text-orange-500 font-semibold">

//             Pending

//             </span>

//         )}

//         </div>

//     </div>

//     ))

// )}

// </div>
// {/* FOOTER */}

// <div className="mt-10 text-center text-gray-500 text-sm">

// Total Tasks : {visibleTasks.length}

// </div>

// </div>

// </div>

// );

// }
import { useEffect, useState } from "react";
import {
FaClipboardList,
FaSearch,
FaSignOutAlt,
FaPaperclip,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../features/auth/authSlice";
import api from "../services/api";

export default function Admin() {
const [tasks, setTasks] = useState([]);
const [loading, setLoading] = useState(true);
const [search, setSearch] = useState("");

const dispatch = useDispatch();
const navigate = useNavigate();
const { user } = useSelector((state) => state.auth);

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

const handleLogout = () => {
    dispatch(logout());
    navigate("/");
};

const visibleTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
);

if (loading) {
    return (
    <div className="min-h-screen flex items-center justify-center text-2xl">
        Loading...
    </div>
    );
}

return (
    <div className="min-h-screen bg-slate-100">
    
    <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-3 rounded-xl">
            <FaClipboardList className="text-white text-2xl" />
            </div>
            <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-500">Task Management System</p>
            </div>
        </div>

        <div className="flex items-center gap-5">
            <div className="text-right">
            <p className="font-semibold">{user?.name}</p>
            <p className="text-gray-500 text-sm">Administrator</p>
            </div>
            <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg flex items-center gap-2"
            >
            <FaSignOutAlt />
            Logout
            </button>
        </div>
        </div>
    </nav>

    <div className="max-w-7xl mx-auto px-8 py-8">
        <h2 className="text-3xl font-bold">Welcome Admin</h2>
        <p className="text-gray-500 mt-2">
        Monitor all user tasks from one place.
        </p>

        
        <div className="bg-white rounded-2xl shadow p-5 mt-8">
        <div className="relative">
            <FaSearch className="absolute left-4 top-4 text-gray-400" />
            <input
            type="text"
            placeholder="Search Task..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        </div>

        
        <div className="bg-white rounded-2xl shadow mt-8 overflow-hidden">
        <div className="grid grid-cols-12 bg-slate-50 border-b px-6 py-4 font-semibold text-slate-700">
            <div className="col-span-3">User</div>
            <div className="col-span-4">Task</div>
            <div className="col-span-3">Attachment</div>
            <div className="col-span-2 text-center">Status</div>
        </div>

        {visibleTasks.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
            No Tasks Found
            </div>
        ) : (
            visibleTasks.map((task) => (
            <div
                key={task._id}
                className="grid grid-cols-12 items-center px-6 py-4 border-b hover:bg-slate-50 transition"
            >
                
                <div className="col-span-3">
                <p className="font-semibold text-slate-700">
                    {task.user?.name}
                </p>
                <p className="text-sm text-gray-500">{task.user?.email}</p>
                </div>

                
                <div className="col-span-4">
                <p className="font-medium">{task.title}</p>
                </div>

                <div className="col-span-3">
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
                    <span className="text-gray-400">No File</span>
                )}
                </div>

            
                <div className="col-span-2 text-center">
                {task.completed ? (
                    <span className="text-green-600 font-semibold">
                    Completed
                    </span>
                ) : (
                    <span className="text-orange-500 font-semibold">
                    Pending
                    </span>
                )}
                </div>
            </div>
            ))
        )}
        </div>

        {/* Footer summary */}
        <div className="mt-10 text-center text-gray-500 text-sm">
        Total Tasks: {visibleTasks.length}
        </div>
    </div>
    </div>
);
}