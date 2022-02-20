import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { login } from '../user/userSlice'


const initialState = null


export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string|null>) => action.payload,
    clearToken: (state) => null,
  },
  extraReducers: (builder) => {
    builder
    .addCase(
      login.fulfilled,
      (state, action) => {
        console.log('token:', action.payload.token)
        return {
          value: action.payload.token,
        }
      }
    )
  },
})


export default tokenSlice.reducer
export const { clearToken, setToken } = tokenSlice.actions
