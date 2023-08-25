import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/apiConfig";

const initialState = {
  loading: false,
  transactionInfo: null,
  transactions: [],
  totalCount: null,
};

export const requestGetAllTransaction = createAsyncThunk(
  "all/transactions",
  async ({ page, size }) => {
    const res = await axiosInstance.get("/user/transaction/all", {
      params: {
        page,
        size,
      },
    });
    return res.data;
  }
);

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const actionList = [requestGetAllTransaction];
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

    //requestGetAllTransaction
    builder.addCase(requestGetAllTransaction.fulfilled, (state, action) => {
      state.transactions = action.payload.transactions;
      state.totalCount = action.payload.totalCount;
      state.loading = false;
    });
  },
});

export const {} = transactionSlice.actions;

export const transactionState = (state) => state.transaction;

export default transactionSlice.reducer;
