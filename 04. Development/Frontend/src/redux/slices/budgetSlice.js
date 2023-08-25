import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/apiConfig";

const initialState = {
  budgets: [],
  loading: false,
  budgetInfo: null,
  totalCount: null,
};

export const requestGetAllbudget = createAsyncThunk(
  "user/budget",
  async ({ page, size }) => {
    const res = await axiosInstance.get("/user/budget/all", {
      params: {
        page,
        size,
      },
    });
    return res.data;
  }
);

export const requestCreateBudget = createAsyncThunk(
  "user/createBudget",
  async (props) => {
    const res = await axiosInstance.post("/user/budget", { ...props });
    return { data: res.data, status: res.status };
  }
);

export const requestUpdateBudget = createAsyncThunk(
  "user/updateBudget",
  async (props) => {
    const res = await axiosInstance.put(`/user/budget/${props.budgetId}`, {
      ...props,
    });
    return { data: res.data, status: res.status };
  }
);

export const requestFindBudgetByDte = createAsyncThunk(
  "user/findBudgetByDate",
  async (props) => {
    const res = await axiosInstance.get("/user/budget/date", { ...props });
    return { data: res.data, status: res.status };
  }
);

export const requestDeleteBudget = createAsyncThunk(
  "user/deleteBudget",
  async (props) => {
    const res = await axiosInstance.post(`/user/budget/${props.budgetId}`);
    return { data: res.data, status: res.status };
  }
);

export const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const actionList = [
      requestGetAllbudget,
      requestCreateBudget,
      requestUpdateBudget,
      requestFindBudgetByDte,
      requestDeleteBudget,
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

    //requestGetAllbudget
    builder.addCase(requestGetAllbudget.fulfilled, (state, action) => {
      state.budgets = action.payload.budgets;
      state.totalCount = action.payload.totalCount;
      state.loading = false;
    });

    builder.addCase(requestCreateBudget.fulfilled, (state, action) => {
      state.budgetInfo = action.payload;
      state.loading = false;
    });

    builder.addCase(requestUpdateBudget.fulfilled, (state, action) => {
      state.budgetInfo = action.payload;
      state.loading = false;
    });

    builder.addCase(requestFindBudgetByDte.fulfilled, (state, action) => {
      state.budgets = action.payload;
      state.loading = false;
    });

    builder.addCase(requestDeleteBudget.fulfilled, (state, action) => {
      state.budgetInfo = action.payload;
      state.loading = false;
    });
  },
});

export const {} = budgetSlice.actions;

export const budgetState = (state) => state.budget;

export default budgetSlice.reducer;
