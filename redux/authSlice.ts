import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: {
    id: string;
    username: string
    email: string;
    profile_picture?: string;
  } | null;
  isAuthenticated: boolean;
}

const storedUser = typeof window !== "undefined" ? localStorage.getItem("user") : null;

const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  isAuthenticated: storedUser ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ user: any }>) => {
      state.user = {
        id: action.payload.user.id,
        username: action.payload.user.username,
        email: action.payload.user.email,
        profile_picture: action.payload.user.profile_picture || "",
      };
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(state.user))
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken")
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
