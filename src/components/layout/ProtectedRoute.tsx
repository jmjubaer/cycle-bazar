import { Navigate } from "react-router-dom";
import {
    logout,
    selectCurrentToken,
    TUser,
} from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { ReactNode } from "react";
import { verifyToken } from "../../utils/verifyToken";
type TProtectedRoute = {
    children: ReactNode;
    role?: string; // admin, student, faculty etc.
};
const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
    const token = useAppSelector(selectCurrentToken);
    const user = token && verifyToken(token);
    const dispatch = useAppDispatch();
    // console.log(role);
    if ((user as TUser)?.role !== role && role !== undefined) {
        dispatch(logout());
        return <Navigate to={"/login"} replace={true} />;
    }
    if (!token) {
        return <Navigate to={"/login"} replace={true} />;
    }
    return children;
};

export default ProtectedRoute;
