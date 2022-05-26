import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

const { actions } = userSlice;
export const { setUser } = actions;
export default userSlice.reducer;
