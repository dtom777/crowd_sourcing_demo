import { configureStore } from '@reduxjs/toolkit';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { SWRConfig } from 'swr';

import loadingSlice from '@/stores/loading-slice';

import ProfileEditForm from '@/components/form/mypage/profile/EditForm';

describe('Profile edit form', () => {
  let store;
  beforeEach(async () => {
    store = configureStore({
      reducer: {
        loading: loadingSlice,
      },
    });

    render(
      <Provider store={store}>
        <SWRConfig value={{ dedupingInterval: 0 }}>
          <ProfileEditForm />
        </SWRConfig>
      </Provider>
    );

    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
  });

  test('displays view profile', () => {
    const linkTitle = screen.getByRole('link', {
      name: /view profile/i,
    });
    expect(linkTitle).toBeInTheDocument();
  });
});
