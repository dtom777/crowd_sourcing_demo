import { rest } from 'msw';

import { readFakeData } from '@/__tests__/__mocks__/fakeData';

export const handlers = [
  rest.get('http://localhost:3000/api/user/get', async (req, res, ctx) => {
    const { fakeUsers } = await readFakeData();

    return res(ctx.json({ user: fakeUsers[0] }));
  }),
];
