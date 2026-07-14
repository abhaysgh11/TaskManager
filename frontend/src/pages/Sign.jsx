// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { signup } from "../features/auth/authSlice";

// export default function Signup() {
// const dispatch = useDispatch();
// const navigate = useNavigate();

// const { loading, error } = useSelector((state) => state.auth);

// const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
// });

// const handleChange = (e) => {
//     setFormData({
//     ...formData,
//     [e.target.name]: e.target.value,
//     });
// };

// const handleSubmit = async (e) => {
//     e.preventDefault();

//     const resultAction = await dispatch(signup(formData));

//     if (signup.fulfilled.match(resultAction)) {
//     alert("Account created successfully!");
//     navigate("/");
//     }
// };

// return (
//     <div style={{ width: "350px", margin: "100px auto" }}>
//     <h2>Create Account</h2>

//     <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: "15px" }}>
//         <input
//             type="text"
//             name="name"
//             placeholder="Enter Name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             style={{ width: "100%", padding: "10px" }}
//         />
//         </div>

//         <div style={{ marginBottom: "15px" }}>
//         <input
//             type="email"
//             name="email"
//             placeholder="Enter Email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             style={{ width: "100%", padding: "10px" }}
//         />
//         </div>

//         <div style={{ marginBottom: "15px" }}>
//         <input
//             type="password"
//             name="password"
//             placeholder="Enter Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             style={{ width: "100%", padding: "10px" }}
//         />
//         </div>

//         <button
//         type="submit"
//         disabled={loading}
//         style={{
//             width: "100%",
//             padding: "10px",
//             cursor: "pointer",
//         }}
//         >
//         {loading ? "Creating Account..." : "Sign Up"}
//         </button>
//     </form>

//     {error && (
//         <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
//     )}

//     <p style={{ marginTop: "20px" }}>
//         Already have an account?{" "}
//         <Link to="/">Login</Link>
//     </p>
//     </div>
// );
// }

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../features/auth/authSlice";
import {
FaClipboardList,
FaUser,
FaEnvelope,
FaLock,
} from "react-icons/fa";

export default function Signup() {
const dispatch = useDispatch();
const navigate = useNavigate();

const { loading, error } = useSelector((state) => state.auth);

const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
});

const handleChange = (e) => {
    setFormData((prev) => ({
    ...prev,
    [e.target.name]: e.target.value,
    }));
};

const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(signup(formData));

    if (signup.fulfilled.match(result)) {
    navigate("/");
    }
};

return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-slate-100 to-blue-200 px-4">

    <div className="bg-white w-130 l-10 -w-lg rounded-3xl shadow-2xl p-10">

        <div className="flex justify-center mb-4">
        <div className="bg-blue-600 w-15 h-15 rounded-2xl flex items-center justify-center shadow-lg">
            <FaClipboardList className="text-white text-3xl" />
        </div>
        </div>

        <h1 className="text-4xl font-bold text-center text-slate-800">
        Create Account
        </h1>

        <p className="text-center text-gray-500 mt-3">
        Join Task Manager 🚀
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-5">

        <div>

            <label className="font-semibold text-slate-700">
            Name
            </label>

            <div className="flex items-center border rounded-xl px-4 py-3 mt-2">

            <FaUser className="text-gray-400 mr-3" />

            <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full outline-none"
                value={formData.name}
                onChange={handleChange}
                required
            />

            </div>

        </div>

        {/* Email */}

        <div>

            <label className="font-semibold text-slate-700">
            Email
            </label>

            <div className="flex items-center border rounded-xl px-4 py-3 mt-2">

            <FaEnvelope className="text-gray-400 mr-3" />

            <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full outline-none"
                value={formData.email}
                onChange={handleChange}
                required
            />

            </div>

        </div>

        {/* Password */}

        <div>

            <label className="font-semibold text-slate-700">
            Password
            </label>

            <div className="flex items-center border rounded-xl px-4 py-3 mt-2">

            <FaLock className="text-gray-400 mr-3" />

            <input
                type="password"
                name="password"
                placeholder="Create password"
                className="w-full outline-none"
                value={formData.password}
                onChange={handleChange}
                required
            />

            </div>

        </div>

        {error && (
            <div className="bg-red-100 text-red-700 rounded-lg p-3">
            {error}
            </div>
        )}

        <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition duration-300"
        >
            {loading ? "Creating..." : "Create Account"}
        </button>

        </form>

        <div className="flex items-center my-8">

        <div className="flex-1 border-t"></div>

        <span className="px-4 text-gray-400">
            OR
        </span>

        <div className="flex-1 border-t"></div>

        </div>

        <p className="text-center text-gray-600">

        Already have an account?

        <Link
            to="/"
            className="text-blue-600 font-semibold ml-2 hover:underline"
        >
            Sign In
        </Link>

        </p>

    </div>

    </div>
);
}