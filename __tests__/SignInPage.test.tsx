/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import client from 'next-auth/client';
import SignInPage from '../pages/auth/signin';

jest.mock('next-auth/client');
jest.mock('next/router', () => ({
  useRouter() {
    return {
      asPath: '/auth/signin',
    };
  },
}));

describe('SignInPage', () => {
  test('renders signInPage is correct', () => {
    client['useSession'] = jest.fn().mockReturnValue([null, false]);
    render(<SignInPage />);
    expect(screen.getByTestId('login').textContent).toEqual('ログイン');
    expect(screen.getByText('Twitterログイン')).toBeInTheDocument();
    expect(screen.getByText('Facebookログイン')).toBeInTheDocument();
    expect(screen.getByTestId('or').textContent).toEqual('または');
    expect(screen.getByLabelText('メールアドレス')).toBeInTheDocument();
    expect(screen.getByLabelText('パスワード')).toBeInTheDocument();
    expect(screen.getByText('メールアドレスでログイン')).toBeInTheDocument();
    expect(screen.getByTestId('passwordRemainder').textContent).toEqual(
      'ログインでお困りの時はこちら'
    );
    // screen.debug();
  });
});

// ①
// export const mockSession = {
//   user: {
//     name: 'testUser',
//     email: 'test@test.com',
//     password: '11111111',
//     image: '/avatar-1.jpg',
//   },
// };

// const handlers = [
//   rest.get('/api/auth/session', (req, res, ctx) =>
//     res(ctx.status(200), ctx.json(mockSession))
//   ),
// ];
// const server = setupServer(...handlers);

// beforeAll(() => server.listen());
// afterAll(() => server.close());
// afterEach(() => server.resetHandlers());
// describe('SignIn', () => {
//   test('SignIn', async () => {
//     const user = {
//       name: 'testUser',
//       email: 'test@test.com',
//       password: '11111111',
//       image: '/avatar-1.jpg',
//     };

//     prismaMock.user.create.mockResolvedValue(user);

//     client['useSession'] = jest.fn().mockReturnValue([null, false]);
//     render(<SignInPage />);

//     userEvent.type(
//       screen.getByPlaceholderText('tunoru@tunoru.me'),
//       'test@test.com'
//     );
//     userEvent.type(screen.getByPlaceholderText('******'), '11111111');
//     userEvent.click(screen.getByTestId('signInByEmail'));

//     expect(await screen.findByText('募集する')).toBeInTheDocument();
//   });
// });

// ②
// describe('SignIn', () => {
//   test('Check for errors when signIn with the wrong password', async () => {
//     // const user = {
//     //   name: 'testUser',
//     //   email: 'test@test.com',
//     //   password: '11111111',
//     //   image: '/avatar-1.jpg',
//     // };
//     // prismaMock.user.create.mockResolvedValue(user);
//     client['useSession'] = jest.fn().mockReturnValue([null, false]);
//     render(<SignIn />);

//     userEvent.type(
//       screen.getByPlaceholderText('tunoru@tunoru.me'),
//       'douke@fbl.jp'
//     );
//     userEvent.type(screen.getByPlaceholderText('******'), '111111111');
//     // userEvent.type(screen.getByLabelText('メールアドレス'), 'douke@fbl.jp');
//     // userEvent.type(screen.getByLabelText('パスワード'), '111111111');
//     userEvent.click(screen.getByTestId('signInByEmail'));

//     await waitFor(() => {
//       expect(screen.getByTestId('errorMessage').textContent).toEqual(
//         'メールアドレスまたはパスワードが正しくありません'
//       );
//     });
//   });
// });
