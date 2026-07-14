import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Signup from "./pages/Sign";
import Home from "./pages/Home";
import PrivateRoute from "./routes/PriRoutes";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/home" element={
                <PrivateRoute allowedRole="user"><Home /></PrivateRoute> 
                } />
                <Route path = "/admin" element={
                    <PrivateRoute allowedRole="admin"><Admin /></PrivateRoute>}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

