import Card from '@/components/elements/card/Card';
import { memo, VFC } from 'react';
import { PostWithUser } from 'types/post.type';

type Props = {
  posts: Array<PostWithUser>;
};

const RelationCardList: VFC<Props> = ({ posts }) => {
  return (
    <ul className='grid gap-4 md:grid-cols-2 lg:grid-cols-1'>
      {posts.map((post) => {
        return <Card post={post} key={post.id} />;
      })}
    </ul>
  );
};

export default memo(RelationCardList);
