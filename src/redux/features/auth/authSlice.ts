import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
export type TUser = {
    email: string;
    role: string;
    iat: number;
    exp: number;
};
type TAuthState = {
    user: null | TUser;
    token: null | string;
};
const initialState: TAuthState = {
    user: null,
    token: null,
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { user, token } = action.payload;
            state.user = {
                role: user?.role,
                exp: user?.exp,

                iat: user?.iat,
                email: user?.email,
            };
            state.token = token;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
});
// get current user token
export const selectCurrentToken = (state: RootState) => state.auth.token;
// get current user token
export const selectCurrentUser = (state: RootState) => state.auth.user;
// Export despatch function
export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
