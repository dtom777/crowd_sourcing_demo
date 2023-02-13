import BaseLinkButton from '@/components/atoms/button/BaseLinkButton';
import AvatarWithNameAndCreatedAt from '../avatar/AvatarWithNameAndCreatedAt';
import styles from './PostCard.module.css';
import { memo, VFC } from 'react';
import { PostWithUser } from 'types/post.type';

type Props = {
  post: PostWithUser;
};

const PostCard: VFC<Props> = ({ post }) => {
  return (
    <>
      <BaseLinkButton href={`/posts/${post.id}`}>
        <div className={`${styles.shine}`}>
          <div className='py-2 px-4 bg-black lg:text-lg text-sm text-white font-bold'>
            募集
          </div>
          <div className='h-60 md:p-10 p-4 bg-yellow-300 bg-bg-post'>
            <div className='h-1/2 flex justify-center lg:text-xl text-md font-black break-all whitespace-pre-wrap'>
              <h1 className='max-w-md block truncate whitespace-pre-wrap'>
                {post.title}
              </h1>
            </div>
            <div className='h-1/2 mt-6 lg:text-base md:text-sm text-xs font-bold leading-normal'>
              <pre className='block truncate whitespace-pre-wrap'>
                {post.content}
              </pre>
              <div className='mt-6'>
                {post.reward && post.reward !== 0 ? (
                  <p>報酬:{post.reward.toLocaleString()}USD</p>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
          <AvatarWithNameAndCreatedAt
            containerClassName='md:pl-4 md:py-2 py-1 bg-gray-100'
            userNameClassName='font-semibold md:text-base text-sm'
            createdAtClassName='md:text-base text-xs md:mr-2 mr-1'
            post={post}
          />
        </div>
      </BaseLinkButton>
    </>
  );
};

export default memo(PostCard);
