import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      isLoggedIn: false,
      token: null,
      email: null,
      firstName: null,
      lastName: null,
      createdAt: null,
      updatedAt: null,
      id: null,
    },
  },
  reducers: {
    login: (currentState, action) => {
      const user = {
        ...currentState.user,
        isLoggedIn: true,
        token: action.payload,
      };
      return { ...currentState, user };
    },
    updateProfile: (currentState, action) => {
      const user = { ...currentState.user, ...action.payload };
      return { ...currentState, user };
    },
    logout: (currentState) => {
      const user = {
        ...currentState.user,
        isLoggedIn: false,
        token: null,
        email: null,
        firstName: null,
        lastName: null,
        createdAt: null,
        updatedAt: null,
        id: null,
      };
      return { ...currentState, user };
    },
  },
});
