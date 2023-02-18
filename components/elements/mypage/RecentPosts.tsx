import { Post } from '@prisma/client';
import Link from 'next/link';
import { VFC } from 'react';

import Card from '../card/Card';
import ConstMessage from '../const/ConstMessage';

type Props = {
  posts: Post[]; // TODO fix include
};

const RecentPosts: VFC<Props> = ({ posts }) => {
  return (
    <div className='md:w-1/2 w-full py-4 lg:px-8 px-4'>
      <div className='flex justify-between items-baseline'>
        <h2 className='text-lg font-bold'>Your recent post</h2>
        <Link href='/mypage/posts'>
          <a className='text-gray-400 text-sm hover:opacity-50'>
            View all your posts
          </a>
        </Link>
      </div>
      {posts?.length ? (
        <>
          {posts.map((post) => (
            <div key={post.id} className='pt-4 pr-4'>
              <Card post={post} />
            </div>
          ))}
        </>
      ) : (
        <ConstMessage message='No posts yet' />
      )}
    </div>
  );
};

export default RecentPosts;
