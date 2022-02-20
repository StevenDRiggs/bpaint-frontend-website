import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { login, signup } from '../user/userSlice'


interface TokenState {
  value: string|null;
}


const initialState: TokenState = {
  value: null,
}


export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    clearToken: () => initialState,
    setToken: (state, action) => action.payload,
  },
  extraReducers: (builder) => {
    builder
    .addCase(
      login.fulfilled,
      (state, action) => {
        return {
          value: action.payload.token,
        }
      }
    )
    .addCase(
      signup.fulfilled,
      (state, action) => {
        return {
          value: action.payload.token,
        }
      }
    )
  },
})


export default tokenSlice.reducer
export const { clearToken, setToken } = tokenSlice.actions
