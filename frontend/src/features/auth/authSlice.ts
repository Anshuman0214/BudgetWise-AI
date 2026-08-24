import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string | null;
  user: { id: string; name: string; email: string } | null;
}

const initialState: AuthState = {
  accessToken: typeof localStorage === "undefined" ? null : localStorage.getItem("accessToken"),
  user: typeof localStorage === "undefined" || !localStorage.getItem("user") ? null : JSON.parse(localStorage.getItem("user") as string)
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      if (typeof localStorage !== "undefined" && action.payload.accessToken) localStorage.setItem("accessToken", action.payload.accessToken);
      if (typeof localStorage !== "undefined" && action.payload.user) localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
      if (typeof localStorage !== "undefined") localStorage.clear();
    }
  }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
