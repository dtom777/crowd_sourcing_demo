import CardList from '@/components/elements/card/CardList';
import { memo, VFC } from 'react';
import { PostWithUser } from 'types/post.type';

type Props = {
  posts: Array<PostWithUser>;
};

const CardList: VFC<Props> = ({ posts }) => {
  return (
    <>
      {posts.length && (
        <div className='mb-6'>
          <CardList posts={posts} />
        </div>
      )}
    </>
  );
};

export default memo(CardList);
