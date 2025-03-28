import { createSlice } from "@reduxjs/toolkit";
import { News } from "../model";
import { addNewsThunk, deleteNewsThunk, getAllNewsThunk, updateNewsThunk } from "../api";

type NewsState = {
  news: News[];
  isLoading: boolean;
  error: string | null;
};

const initialState: NewsState = {
  news: [],
  isLoading: false,
  error: null,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getAllNewsThunk
      .addCase(getAllNewsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllNewsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.news = action.payload;
      })
      .addCase(getAllNewsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Unknown error";
      })
      // addNewsThunk
      .addCase(addNewsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.news = [...state.news, action.payload];
      })
      .addCase(addNewsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Unknown error";
      })
      // updateNewsThunk
      .addCase(updateNewsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateNewsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.news = state.news.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addCase(updateNewsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Unknown error";
      })
      // deleteNewsThunk
      .addCase(deleteNewsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteNewsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.news = state.news.filter((item) =>
          item.id !== action.payload );
      })
      .addCase(deleteNewsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "Unknown error";
      });

  },
});


export const newsReducer = newsSlice.reducer