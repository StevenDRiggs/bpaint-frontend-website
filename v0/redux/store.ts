import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import tokenReducer from './features/token/tokenSlice'
import userReducer from './features/user/userSlice'


const persistConfig = {
  key: 'token',
  version: 1,
  storage,
}

const persistedReducer = persistReducer(persistConfig, tokenReducer)


export const store = configureStore({
  reducer: {
    token: persistedReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
