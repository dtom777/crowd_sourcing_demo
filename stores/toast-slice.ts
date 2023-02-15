import { createSlice } from '@reduxjs/toolkit';

export interface ToastSlice {
  status: 'success' | 'error' | 'nothing';
  content: string;
}

const initialState: ToastSlice = {
  status: 'nothing',
  content: '',
};

const toastsSlice = createSlice({
  name: 'toasts',
  initialState,
  reducers: {
    toastAdded(state, action) {
      console.log(state);
    },
  },
});

export const { toastAdded } = toastsSlice.actions;

export default toastsSlice.reducer;
