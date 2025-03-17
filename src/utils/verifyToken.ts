import { jwtDecode } from "jwt-decode";
import { TUser } from "../redux/features/auth/authSlice";
// Verify JWT token
export const verifyToken = (token: string) => {
    const userData = jwtDecode(token) as TUser;
    // Convert supper admin into admin
    if (userData?.role === "supperAdmin") {
        return {
            ...userData,
            role: "admin",
        };
    } else {
        return { ...userData };
    }
};
