import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function PrivateRoute({ children, allowedRole }) {
const { isAuthenticated, user } = useSelector((state) => state.auth);

if (!isAuthenticated) {
    return <Navigate to="/" replace />;
}

if (allowedRole && user?.role !== allowedRole) {
    return <Navigate to="/" replace />;
}

return children;
}