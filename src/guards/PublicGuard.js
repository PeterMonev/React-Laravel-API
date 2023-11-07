import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/authContext"

export const PublicGuard = ({ children }) =>{
    const { user } = useAuth();

    if(!user) {
        return <Navigate to="/login" replace={true}/>
    }

    return children ? children : <Outlet/>
}