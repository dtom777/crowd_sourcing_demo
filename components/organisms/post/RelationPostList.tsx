import BaseLinkButton from '@/components/atoms/button/BaseLinkButton';
import PostsList from './PostsList';
import { memo, VFC } from 'react';
import { PostWithUser } from 'types/post.type';

type Props = {
  posts: Array<PostWithUser>;
};

const RelationPostList: VFC<Props> = ({ posts }) => {
  return (
    <div className='mb-12'>
      <h2 className='py-2 px-4 lg:bg-white bg-black lg:text-black text-white lg:border-b-2 font-bold text-sm'>
        この募集を見ている人におすすめ
      </h2>
      <div className='mx-2'>
        <PostsList posts={posts} display={'list'} />
      </div>
      <div className='p-4'>
        <BaseLinkButton
          href='/category'
          className='flex justify-end text-sm hover:opacity-50'
        >
          他の募集もみる &gt;
        </BaseLinkButton>
      </div>
    </div>
  );
};

export default memo(RelationPostList);
