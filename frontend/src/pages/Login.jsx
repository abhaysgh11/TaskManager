import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../features/auth/authSlice";

export default function Login() {
const dispatch = useDispatch();
const navigate = useNavigate();

const { loading, error } = useSelector((state) => state.auth);

const [formData, setFormData] = useState({
    email: "",
    password: "",
});

const handleChange = (e) => {
    setFormData({
    ...formData,
    [e.target.name]: e.target.value,
    });
};

const handleSubmit = async (e) => {
    e.preventDefault();

    const resultAction = await dispatch(signin(formData));

    if (signin.fulfilled.match(resultAction)) {
    const role = resultAction.payload.user.role;
    if (role === "admin") {
        navigate("/admin");
    } else {
        navigate("/home");
    }
}
};

return (
    <div className="login-container">
    <h1>Login</h1>

    <form onSubmit={handleSubmit}>

        <input
        type="email"
        name="email"
        placeholder="Enter Email"
        value={formData.email}
        onChange={handleChange}
        required
        />

        <input
        type="password"
        name="password"
        placeholder="Enter Password"
        value={formData.password}
        onChange={handleChange}
        required
        />

        <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
        </button>

    </form>

    {error && (
        <p style={{ color: "red", marginTop: "10px" }}>
        {error}
        </p>
    )}

    <p style={{ marginTop: "20px" }}>
        Don't have an account?{" "}
        <Link to="/signup">Signup</Link>
    </p>
    </div>
);
}