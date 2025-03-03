import { jwtDecode } from "jwt-decode";
import { TUser } from "../redux/features/auth/authSlice";

export const verifyToken = (token: string) => {
    const userData = jwtDecode(token) as TUser;
    if (userData.role === "supperAdmin") {
        return {
            ...userData,
            role: "admin",
            // email: userData.email,
            // iat: userData.iat,
            // exp: userData.exp,
        };
    } else {
        return { ...userData };
    }
};
