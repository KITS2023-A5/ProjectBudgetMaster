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

export const requestUpdateUser = createAsyncThunk(
  "user/update",
  async (props) => {
    console.log({ props });
    const res = await axiosInstance.put("/user/update", { ...props });
    return res.data;
  }
);

export const requestUpdateUserPassword = createAsyncThunk(
  "user/updatePassword",
  async (props) => {
    const res = await axiosInstance.post("/user/update-password", {
      ...props,
    });
    return { data: res.data, status: res.status };
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
    const actionList = [
      requestLogin,
      requestUpdateUserPassword,
      requestUpdateUser,
    ];
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

    builder.addCase(requestUpdateUserPassword.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(requestUpdateUser.fulfilled, (state, action) => {
      state.loading = false;
    });
  },
});

export const { loadUserInfo } = authSlice.actions;

export const authState = (state) => state.auth;

export default authSlice.reducer;
