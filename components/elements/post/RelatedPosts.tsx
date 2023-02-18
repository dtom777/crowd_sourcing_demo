import { memo, VFC } from 'react';

import { PostWithUser } from 'types/post.type';

import Cards from '../card/Cards';
import ConstMessage from '../const/ConstMessage';

type Props = {
  posts: Array<PostWithUser>;
};

const RelatedPosts: VFC<Props> = ({ posts }) => {
  return (
    <div className='mb-4'>
      <h2 className='mb-4 border-b-2 bg-white py-2 px-4 text-sm font-bold text-black'>
        Related Posts
      </h2>
      <div className='mx-2 flex justify-center'>
        {posts.length ? (
          <Cards
            posts={posts}
            className='grid gap-4 md:grid-cols-2 lg:grid-cols-1'
          />
        ) : (
          <ConstMessage message='No posts yet' />
        )}
      </div>
    </div>
  );
};

export default memo(RelatedPosts);
