import BaseAvatar from '@/components/atoms/avatar/BaseAvatar';
import BaseLinkButton from '@/components/atoms/button/BaseLinkButton';
import CreatedAt from '@/components/atoms/time/CreatedAt';
import { memo, VFC } from 'react';
import { PostWithUser } from 'types/post.type';

type Props = {
  post: PostWithUser;
};

const LinkAvatarWithNameAndCreatedAt: VFC<Props> = ({ post }) => {
  const { id, name, image, createdAt } = post.user;

  return (
    <div className='group flex items-center pl-4 py-2 bg-gray-100'>
      <div className='mr-2'>
        <BaseLinkButton href={`/user/${id}`} className='group-hover:opacity-50'>
          <BaseAvatar src={image} size={40} />
        </BaseLinkButton>
      </div>
      <div>
        <div className='font-semibold'>
          <BaseLinkButton
            href={`/user/${id}`}
            className='group-hover:opacity-50'
          >
            {name}
          </BaseLinkButton>
        </div>
        <CreatedAt createdAt={createdAt} />
      </div>
    </div>
  );
};

export default memo(LinkAvatarWithNameAndCreatedAt);
