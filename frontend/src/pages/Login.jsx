
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../features/auth/authSlice";
import { FaClipboardList, FaEnvelope, FaLock } from "react-icons/fa";

export default function Login() {
const dispatch = useDispatch();
const navigate = useNavigate();

const { loading, error } = useSelector((state) => state.auth);

const [formData, setFormData] = useState({
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

    const result = await dispatch(signin(formData));

    if (signin.fulfilled.match(result)) {
    const role = result.payload.user.role;

    if (role === "admin") {
        navigate("/admin");
    } else {
        navigate("/home");
    }
    }
};

return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-slate-100 to-blue-200 flex items-center justify-center px-6 relative overflow-hidden">

    {/* Background Circles
    <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-300 rounded-full opacity-30"></div>
    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-300 rounded-full opacity-30"></div> */}


    <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl p-10">

        
        <div className="flex justify-center">
        <div className="bg-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg">
            <FaClipboardList className="text-white text-4xl" />
        </div>
        </div>

        
        <h1 className="text-5xl font-extrabold text-center mt-6 text-slate-800">
        Task Manager
        </h1>

        <p className="text-center text-gray-500 mt-3 text-lg">
        Welcome Back.. 
        </p>

        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>

        <div>

            <label className="font-semibold text-slate-700 block mb-2">
            Email
            </label>

            <div className="flex items-center border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">

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

            <label className="font-semibold text-slate-700 block mb-2">
            Password
            </label>

            <div className="flex items-center border rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">

            <FaLock className="text-gray-400 mr-3" />

            <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full outline-none"
                value={formData.password}
                onChange={handleChange}
                required
            />

            </div>

        </div>

        {/* Error */}
        {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-xl text-sm">
            {error}
            </div>
        )}

        {/* Button */}
        <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white py-4 rounded-xl text-lg font-semibold shadow-lg"
        >
            {loading ? "Signing In..." : "Sign In"}
        </button>

        </form>

        
        <div className="flex items-center my-8">

        <div className="flex-1 border-t"></div>

        <span className="px-4 text-gray-400">OR</span>

        <div className="flex-1 border-t"></div>

        </div>

    
        <p className="text-center text-gray-600">

        Don't have an account?

        <Link
            to="/signup"
            className="text-blue-600 font-semibold hover:underline ml-2"
        >
            Sign Up
        </Link>

        </p>

    </div>
    </div>
);
}