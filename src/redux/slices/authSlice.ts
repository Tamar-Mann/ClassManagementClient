import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../types/user.types";

interface AuthState {
  user: UserType | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    setUser: (state, action: PayloadAction<Partial<UserType>>) => {
      state.user = {
        ...state.user,
        ...action.payload,
      } as UserType;
    },
    // setUser: (state, action: PayloadAction<UserType>) => {
    //   state.user = action.payload;
    // },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { loginSuccess, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
