import { render, screen } from '@testing-library/react';
import { Session } from 'next-auth';
import client from 'next-auth/client';

import Navbar from '@/components/layouts/Navbar';

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
  const testUser = {
    name: 'testName',
    email: 'test@gmail.com',
    image: '/avatar-2.jpg',
  };
  const mockSession: Session = {
    expires: '2023-03-22T12:49:47.671Z',
    user: testUser,
  };

  client['useSession'] = jest.fn().mockRejectedValueOnce([mockSession, false]);

  render(<Navbar />);

  const btnTitle = screen.getByRole('button', {
    name: /sign out/i,
  });
  expect(btnTitle).toBeInTheDocument();
});
