import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import gameReducer from "../features/gameSlice";
import userDetails from "../features/userDetails";

export default configureStore({
  reducer: {
    game: gameReducer,
    user: userDetails,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
