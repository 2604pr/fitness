import { createSlice } from "@reduxjs/toolkit";

//load user data from local storage
const loadUserFromLocalStorage = () => {
  try {
    const serializedUser = localStorage.getItem("user");
    return serializedUser ? JSON.parse(serializedUser) : null;
  } catch (e) {
    return null;
  }
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    register: loadUserFromLocalStorage(),
    login: loadUserFromLocalStorage(),
  },
  reducers: {
    userRegister: (state, action) => {
      state.register = action.payload;
      // Save user data to local storage
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("token", action.payload.token);
    },
    userLogin: (state, action) => {
      state.login = action.payload;
      // Save user data to local storage
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("token", action.payload.token);
    },
    userLogout: (state, action) => {
      state.register = null;
      state.login = null;
      //removing the user data from local storage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { userRegister, userLogin, userLogout } = authSlice.actions;

export default authSlice.reducer;
