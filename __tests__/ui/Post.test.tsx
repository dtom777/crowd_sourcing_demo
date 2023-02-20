import { render, screen } from '@testing-library/react';
import client from 'next-auth/client';

import PostComponent from '@/pages/posts/[id]';

import { readFakeData } from '../__mocks__/fakeData/index';

test('post component displays correct post information', async () => {
  client['useSession'] = jest.fn().mockReturnValueOnce([null, false]);
  const { fakePosts } = await readFakeData();
  render(<PostComponent post={fakePosts[0]} relationPosts={[]} />);

  const heading = screen.getByRole('heading', {
    name: /Software Engineer Node/i,
  });
  expect(heading).toBeInTheDocument();
});
