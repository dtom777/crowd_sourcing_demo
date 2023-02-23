import { render, screen } from '@testing-library/react';
import client from 'next-auth/client';

import Navbar from '@/components/layouts/Navbar';

import { mockSession } from '../__mocks__/fakeData/user';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: '',
    };
  },
}));

test('navbar component displays signin view', async () => {
  client['useSession'] = jest.fn().mockReturnValueOnce([null, false]);

  render(<Navbar />);

  const linkTitle = screen.getByRole('link', {
    name: /sign in/i,
  });
  expect(linkTitle).toBeInTheDocument();
});

test('navbar component displays login view', async () => {
  client['useSession'] = jest.fn().mockReturnValueOnce([mockSession, false]);

  render(<Navbar />);

  const btnTitle = screen.getByRole('button', {
    name: /sign out/i,
  });
  expect(btnTitle).toBeInTheDocument();
});
