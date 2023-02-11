import getConfig from 'next/config';
import { faTwitter, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import SnsButton from '@/components/atoms/button/SnsButton';
import ToggleLikeButton from '@/components/molecules/like/ToggleLikeButton';
import LikeModal from '@/components/molecules/like/LikeModal';
import { memo, VFC } from 'react';
import { Session } from 'next-auth';
import { PostWithUser } from 'types/post.type';

type Props = {
  session?: Session;
  post: PostWithUser;
};

const SnsButtonAndLikeButton: VFC<Props> = ({ session, post }) => {
  const { publicRuntimeConfig } = getConfig();
  const baseUrl = publicRuntimeConfig.WEBAPP_URL;

  return (
    <div className='h-14 flex justify-end items-center'>
      <div style={{ minWidth: '102px' }}>
        <SnsButton
          href={`https://twitter.com/intent/tweet?text=${post.content}&url=${baseUrl}/posts/${post.id}`}
          buttonClassName='bg-blue-400 px-3 py-1 mr-2 rounded-2xl'
          icon={faTwitter}
        >
          ツイート
        </SnsButton>
      </div>
      <div style={{ minWidth: '102px' }}>
        <SnsButton
          href={`http://www.facebook.com/share.php?u=${baseUrl}/posts/${post.id}`}
          buttonClassName='bg-blue-500 px-3 py-1 mr-2 rounded-2xl'
          iconClassName='mr-2'
          icon={faFacebookF}
        >
          シェア
        </SnsButton>
      </div>
      {session ? (
        <ToggleLikeButton session={session} id={post.id} />
      ) : (
        <LikeModal post={post} />
      )}
    </div>
  );
};

export default memo(SnsButtonAndLikeButton);
