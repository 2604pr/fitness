import { createSlice } from "@reduxjs/toolkit";

export const workoutSlice = createSlice({
  name: "workout",
  initialState: {
    getWorkouts: [],
    addWorkout: null,
    removeWorkout: null,
    editWorkout: null,
  },
  reducers: {
    allWorkouts: (state, action) => {
      state.getWorkouts = action.payload;
    },
    newWorkout: (state, action) => {
      state.addWorkout = action.payload;
      state.getWorkouts.push(action.payload);
    },
    deleteWorkout: (state, action) => {
      state.removeWorkout = action.payload;
      state.getWorkouts = state.getWorkouts.filter(
        (workout) => workout._id !== action.payload._id
      );
    },
    updateWorkout: (state, action) => {
      state.editWorkout = action.payload;
      const index = state.getWorkouts.findIndex(
        (workout) => workout._id === action.payload._id
      );
      if (index !== -1) {
        state.getWorkouts[index] = action.payload;
      }
    },
  },
});

export const { allWorkouts, newWorkout, deleteWorkout, updateWorkout } =
  workoutSlice.actions;

export default workoutSlice.reducer;
