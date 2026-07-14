import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../features/auth/authSlice";

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
    setFormData({
    ...formData,
    [e.target.name]: e.target.value,
    });
};

const handleSubmit = async (e) => {
    e.preventDefault();

    const resultAction = await dispatch(signup(formData));

    if (signup.fulfilled.match(resultAction)) {
    alert("Account created successfully!");
    navigate("/");
    }
};

return (
    <div style={{ width: "350px", margin: "100px auto" }}>
    <h2>Create Account</h2>

    <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
        <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px" }}
        />
        </div>

        <div style={{ marginBottom: "15px" }}>
        <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px" }}
        />
        </div>

        <div style={{ marginBottom: "15px" }}>
        <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px" }}
        />
        </div>

        <button
        type="submit"
        disabled={loading}
        style={{
            width: "100%",
            padding: "10px",
            cursor: "pointer",
        }}
        >
        {loading ? "Creating Account..." : "Sign Up"}
        </button>
    </form>

    {error && (
        <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
    )}

    <p style={{ marginTop: "20px" }}>
        Already have an account?{" "}
        <Link to="/">Login</Link>
    </p>
    </div>
);
}