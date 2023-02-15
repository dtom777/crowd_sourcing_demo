import { memo, VFC } from 'react';

import Card from '@/components/elements/card/Card';

import { PostWithUser } from 'types/post.type';

type Props = {
  posts: Array<PostWithUser>;
  className?: string;
};

const Cards: VFC<Props> = ({ posts, className }) => {
  return (
    <ul className={className}>
      {posts.map((post) => (
        <Card post={post} key={post.id} />
      ))}
    </ul>
  );
};

export default memo(Cards);
