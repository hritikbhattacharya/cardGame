import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  score: 0,
};

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    addUsername: (state, action) => {
      state.username = action.payload;
    },
    addScore: (state, action) => {
      state.score = action.payload;
    },
  },
});

export const { addUsername, addScore } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
