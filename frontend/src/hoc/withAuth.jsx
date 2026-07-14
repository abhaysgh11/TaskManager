import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const withAuth = (WrappedComponent, allowedRole) => {
    return function AuthComponent(propes){
        const { isAuthenticated, user } = useSelector((state) => state.auth);
        if (!isAuthenticated) {
            return <Navigate to="/" replace />;
        }
    
        if (allowedRole && user?.role !== allowedRole) {
            return <Navigate to="/" replace />;
        }
    
        return <WrappedComponent {...propes} />;
    }
    
}

export default withAuth;