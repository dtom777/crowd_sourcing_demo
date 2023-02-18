import { createSlice } from '@reduxjs/toolkit';

import { RootState } from './store';

export interface LoadingState {
  isLoading: boolean;
}

const initialState: LoadingState = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    loadingToggled(state) {
      state.isLoading = !state.isLoading;
    },
  },
});

export const { loadingToggled } = loadingSlice.actions;

export const selectIsLoading = (state: RootState) => state.loading.isLoading;

export default loadingSlice.reducer;
