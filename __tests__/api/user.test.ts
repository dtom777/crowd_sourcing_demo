import client from 'next-auth/client';
import { testApiHandler } from 'next-test-api-route-handler';

import userGetHandler from '@/pages/api/user/get';
import getUserWithProfile from '@/utils/api/user/getUserWithProfile';

import { readFakeData } from '../__mocks__/fakeData';
import { mockSession, mockUser } from '../__mocks__/fakeData/user';

jest.mock('@/utils/api/user/getUserWithProfile', () => jest.fn());

test('GET /api/user/get return user from database', async () => {
  client['getSession'] = jest.fn().mockResolvedValueOnce(mockSession);

  await testApiHandler({
    handler: userGetHandler,
    test: async ({ fetch }) => {
      getUserWithProfile.mockImplementation(() => mockUser);
      const res = await fetch({ method: 'GET' });

      expect(res.status).toBe(200);
      const json = await res.json();

      const { fakeUsers } = await readFakeData();
      expect(json).toEqual({ user: fakeUsers[0] });
    },
  });
});

test('GET /api/user/get return unauthorized', async () => {
  await testApiHandler({
    handler: userGetHandler,
    test: async ({ fetch }) => {
      const res = await fetch({ method: 'GET' });

      expect(res.status).toBe(401);
    },
  });
});
