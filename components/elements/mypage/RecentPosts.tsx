import Link from 'next/link';
import { VFC } from 'react';

import { PostWithCommentsAndLike } from '@/types/post.type';

import Card from '../card/Card';
import ConstMessage from '../const/ConstMessage';

type Props = {
  posts: Array<PostWithCommentsAndLike>;
};

const RecentPosts: VFC<Props> = ({ posts }) => {
  return (
    <div className='w-full py-4 px-4 md:w-1/2 lg:px-8'>
      <div className='flex items-baseline justify-between'>
        <h2 className='text-lg font-bold'>Your recent post</h2>
        <Link href='/mypage/posts'>
          <a className='text-sm text-gray-400 hover:opacity-50'>
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
