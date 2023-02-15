import { createSlice } from '@reduxjs/toolkit';

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
    loadingToggled(state, action) {
      state.isLoading = !state.isLoading;
    },
  },
});

export const { loadingToggled } = loadingSlice.actions;

export default loadingSlice.reducer;
