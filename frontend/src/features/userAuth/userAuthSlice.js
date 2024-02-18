import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  username: null,
  email: null,
  coins: null
};

export const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setCoins: (state, action) => {
      state.coins = action.payload;
    }
  }
});

export const { setToken, setUsername, setEmail, setCoins } = userAuthSlice.actions;
export default userAuthSlice.reducer;