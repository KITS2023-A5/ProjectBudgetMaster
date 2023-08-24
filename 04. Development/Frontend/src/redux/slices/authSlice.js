import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/apiConfig";

const initialState = {
  userInfo: null,
  loading: false,
  loadingCheckLogin: true,
};

export const requestLogin = createAsyncThunk(
  "auth/login",
  async ({ usernameOrEmail, password }) => {
    const res = await axiosInstance.post("/auth/signin", {
      usernameOrEmail,
      password,
    });
    return res, { data: res.data, status: res.status };
  }
);

export const requestRegister = createAsyncThunk(
  "auth/register",
  async (props) => {
    const res = await axiosInstance.post("/auth/signup", {
      ...props,
      role: ["ROLE_USER"],
    });

    // return res;
    return { data: res.data, status: res.status };
  }
);

export const requestGetUserFromToken = createAsyncThunk(
  "user/info",
  async () => {
    const res = await axiosInstance.get("/user/info");
    return res.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    const actionList = [requestLogin];
    actionList.forEach((action) => {
      builder.addCase(action.pending, (state) => {
        state.loading = true;
      });
    });

    actionList.forEach((action) => {
      builder.addCase(action.rejected, (state) => {
        state.loading = false;
      });
    });

    builder.addCase(requestLogin.fulfilled, (state, action) => {
      state.userInfo = action.payload.data;
      state.loading = false;
    });

    // requestGetUserFromToken
    builder.addCase(requestGetUserFromToken.pending, (state) => {
      state.loadingCheckLogin = true;
    });
    builder.addCase(requestGetUserFromToken.rejected, (state) => {
      state.loadingCheckLogin = false;
    });
    builder.addCase(requestGetUserFromToken.fulfilled, (state, action) => {
      state.userInfo = action.payload;
      state.loadingCheckLogin = false;
    });
  },
});

export const { loadUserInfo } = authSlice.actions;

export const authState = (state) => state.auth;

export default authSlice.reducer;
