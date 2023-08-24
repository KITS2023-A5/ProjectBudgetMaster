import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/apiConfig";

const initialState = {
  loading: false,
  category: null,
  categorys: [],
};

export const requestGetAllCategory = createAsyncThunk(
  "all/categorys",
  async () => {
    const res = await axiosInstance.get("/all/category");
    return res.data;
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const actionList = [requestGetAllCategory];
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

    //requestGetAllCategory
    builder.addCase(requestGetAllCategory.fulfilled, (state, action) => {
      state.categorys = action.payload;
      state.loading = false;
    });
  },
});

export const {} = categorySlice.actions;

export const categoryState = (state) => state.category;

export default categorySlice.reducer;
