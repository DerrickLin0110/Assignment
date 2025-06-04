import { Outlet, Navigate } from "react-router-dom";
import { useStoreContext } from "../Context";

function ProtectedRoutes() {
    const { email } = useStoreContext();

    return (
        email ? <Outlet /> : <Navigate to="/login"/>
    )
}

export default ProtectedRoutes;