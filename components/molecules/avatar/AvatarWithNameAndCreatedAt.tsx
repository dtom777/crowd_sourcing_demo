import BaseAvatar from '@/components/atoms/avatar/BaseAvatar';
import CreatedAt from '@/components/atoms/time/CreatedAt';
import { User } from '@prisma/client';
import { memo, VFC } from 'react';
import { PostWithUser } from 'types/post.type';

type Props = {
  containerClassName?: string;
  userNameClassName?: string;
  createdAtClassName?: string;
  post?: PostWithUser;
  user?: User;
  imgSize?: number;
};

const AvatarWithNameAndCreatedAt: VFC<Props> = ({
  containerClassName,
  userNameClassName,
  createdAtClassName,
  post,
  user,
  imgSize,
}) => {
  const name = post ? post.user.name : user.name;
  const src = post ? post.user.image : user.image;
  const size = imgSize ? imgSize : 40;

  return (
    <div className={`flex justify-between items-center ${containerClassName}`}>
      <div className='flex items-center mr-1'>
        <BaseAvatar src={src} size={size} />
        <span className={`ml-2 ${userNameClassName}`}>{name}</span>
      </div>
      {createdAtClassName && (
        <CreatedAt createdAt={post.createdAt} className={createdAtClassName} />
      )}
    </div>
  );
};

export default memo(AvatarWithNameAndCreatedAt);
