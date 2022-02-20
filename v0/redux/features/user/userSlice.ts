import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { BACKEND_URL } from '../../../.env'


interface UserState {
  id: number|null;
  username: string|null;
  email: string|null;
  preferences: {
    [index: string]: any;
  };
  flags: {
    [index: string]: any;
  };
  createdAt: Date|null;
  updatedAt: Date|null;
  isAdmin: boolean;
}


const initialState: UserState = {
  id: null,
  username: null,
  email: null,
  preferences: {},
  flags: {},
  createdAt: null,
  updatedAt: null,
  isAdmin: false,
}


export const login = createAsyncThunk(
  'user/login',
  async ({ usernameOrEmail, password }) => {
    return fetch(`${BACKEND_URL}/login`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username_or_email: usernameOrEmail,
          password,
        },
      }),
    })
    .then(resp => resp.json())
    .catch(err => {
      console.log('ERROR:', JSON.stringify(err))
    })
  }
)

export const signup = createAsyncThunk(
  'user/signup',
  async ({ username, email, password }) => {
    return fetch(`${BACKEND_URL}/users`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username,
          email,
          password,
        },
      }),
    })
    .then(resp => resp.json())
    .catch(err => {
      console.log('ERROR:', JSON.stringify(err))
    })
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: () => initialState,
    setUser: (state, action) => action.payload,
  },
  extraReducers: (builder) => {
    builder
    .addCase(
      login.fulfilled,
      (state, action) => action.payload.user
    )
    .addCase(
      signup.fulfilled,
      (state, action) => action.payload.user
    )
  },
})


export default userSlice.reducer
export const { clearUser, setUser } = userSlice.actions
