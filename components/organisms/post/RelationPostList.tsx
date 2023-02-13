import BaseLinkButton from '@/components/atoms/button/BaseLinkButton';
import PostsList from './PostsList';
import { memo, VFC } from 'react';
import { PostWithUser } from 'types/post.type';
import Link from 'next/link';
import RelationCardList from '@/components/elements/card/RelationCardList';

type Props = {
  posts: Array<PostWithUser>;
};

const RelationPostList: VFC<Props> = ({ posts }) => {
  return (
    <div className='mb-4'>
      <h2 className='py-2 px-4 mb-4 bg-white text-black border-b-2 font-bold text-sm'>
        Related Posts
      </h2>
      <div className='mx-2 flex justify-center'>
        {posts.length ? <RelationCardList posts={posts} /> : <>No posts yet</>}
      </div>
    </div>
  );
};

export default memo(RelationPostList);
