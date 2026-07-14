import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Signup from "./pages/Sign";
import Home from "./pages/Home";
import PrivateRoute from "./routes/PriRoutes";
import withAuth from "./hoc/withAuth";



const UserHome = withAuth(Home, "user");
const AdminHome = withAuth(Admin, "admin");

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/home" element={<UserHome/>} />
                <Route path = "/admin" element={<AdminHome/>}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

