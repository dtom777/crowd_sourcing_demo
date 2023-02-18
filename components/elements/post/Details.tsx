import { useSession } from 'next-auth/client';
import { memo, VFC } from 'react';

import ApplyForm from '@/components/form/posts/ApplyForm';

import { PostWithUserAndCategoryAndTags } from 'types/post.type';

import PostMain from './Main';
import LikeButton from '../button/LikeButton';
import ConstApplication from '../const/ConstApplication';

type Props = {
  post: PostWithUserAndCategoryAndTags;
};

const PostDetails: VFC<Props> = ({ post }) => {
  const [session] = useSession();

  return (
    <div className='border'>
      <PostMain post={post} />
      <LikeButton post={post} session={session} />
      <div className='-mt-3 text-center'>
        {session ? <ApplyForm post={post} /> : <ConstApplication />}
      </div>
    </div>
  );
};

export default memo(PostDetails);
