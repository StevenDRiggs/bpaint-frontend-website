import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '../../store'


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
  async ({ usernameOrEmail, password }, { dispatch }) => {
    fetch('http://localhost:5000/login', {
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
    .then(json => {
      console.log('SUCCESS:', JSON.stringify(json))
    })
    .catch(err => {
      console.log('ERROR:', JSON.stringify(err))
    })

    return new Promise()
  },
  options: {

  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
    .addCase(
      login.pending,
      (state, action) => {

      }
    )
    .addCase(
      login.fulfilled,
      (state, action) => {

      }
    )
    .addCase(
      login.rejected,
      (state, action) => {

      }
    )
  },
})


export default userSlice.reducer
