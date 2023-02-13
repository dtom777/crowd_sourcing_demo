import Card from '@/components/elements/card/Card';
import { memo, VFC } from 'react';
import { PostWithUser } from 'types/post.type';

type Props = {
  posts: Array<PostWithUser>;
};

const CardList: VFC<Props> = ({ posts }) => {
  return (
    <ul className='grid md:grid-cols-2 grid-cols-1 gap-4 mr-2 lg:mr-0'>
      {posts.map((post) => {
        return <Card post={post} key={post.id} />;
      })}
    </ul>
  );
};

export default memo(CardList);
