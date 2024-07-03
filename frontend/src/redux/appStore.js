import { configureStore } from "@reduxjs/toolkit";
import workoutReducer from "./workoutSlice";
import authReducer from "./authSlice";

export default configureStore({
  reducer: {
    workout: workoutReducer,
    authentication: authReducer,
  },
});
