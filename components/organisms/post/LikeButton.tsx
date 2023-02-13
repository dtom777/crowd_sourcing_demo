import getConfig from 'next/config';
import { faTwitter, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import SnsButton from '@/components/atoms/button/SnsButton';
import ToggleLikeButton from '@/components/molecules/like/ToggleLikeButton';
import { memo, VFC } from 'react';
import { Session } from 'next-auth';
import { PostWithUser } from 'types/post.type';

type Props = {
  session?: Session;
  post: PostWithUser;
};

const LikeButton: VFC<Props> = ({ session, post }) => {
  return (
    <>
      {session && (
        <div className='h-14 flex justify-end items-center'>
          <ToggleLikeButton session={session} id={post.id} />
        </div>
      )}
    </>
  );
};

export default memo(LikeButton);
