import CardsListItem from '@/components/atoms/card/CardsListItem';
import { memo, VFC } from 'react';
import { PostWithUser } from 'types/post.type';

type Props = {
  posts: Array<PostWithUser>;
};

const PostsList: VFC<Props> = ({ posts }) => {
  return (
    <ul className='flex flex-wrap mr-2 lg:mr-0'>
      {posts.map((post) => {
        return <CardsListItem post={post} key={post.id} />;
      })}
    </ul>
  );
};

export default memo(PostsList);
