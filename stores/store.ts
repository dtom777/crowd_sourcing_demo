import { configureStore } from '@reduxjs/toolkit';

import loadingSlice from './loading-slice';
import toastSlice from './toast-slice';

export const store = configureStore({
  reducer: {
    loading: loadingSlice,
    toast: toastSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
