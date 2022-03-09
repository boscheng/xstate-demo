import { configureStore, createSlice } from "@reduxjs/toolkit";

const countSlice = createSlice({
  name: "count",
  initialState: {
    count: 0,
  },
  reducers: {
    add: (state) => {
      state.count += 1;
    },
    sub: (state) => {
      state.count -= 1;
    },
  },
});

const store = configureStore({
  reducer: countSlice.reducer,
});

export const actions = countSlice.actions;

export default store;
