import Link from 'next/link';
import { memo, VFC } from 'react';

import Avatar from '@/components/elements/avatar/Avatar';

import { PostWithUserAndCategoryAndTags } from 'types/post.type';

type Props = {
  post: PostWithUserAndCategoryAndTags;
};

const PostMain: VFC<Props> = ({ post }) => {
  const { id, name, image, createdAt } = post.user;

  return (
    <div>
      <div className='rounded-none w-full bg-primary text-neutral-content'>
        <div className='card-body'>
          <h2 className='card-title text-2xl mb-4'>{post.title}</h2>
          <p className='mb-4'>{post.content}</p>
          <div className='flex justify-between'>
            <div className='card-actions'>
              <div className='badge badge-outline'>
                <Link href={`/category/${post.categorySlug}`}>
                  <a>{post.categorySlug}</a>
                </Link>
              </div>
            </div>
            <div className='card-actions font-bold mb-4'>
              Reward: {post.reward.toLocaleString()} USD
            </div>
          </div>
          <div className='flex items-center'>
            <div className='mr-2'>
              <Link href={`/users/${id}`}>
                <a className='hover:opacity-50'>
                  <div className='flex flex-col w-full items-center justify-center'>
                    <Avatar src={image} size={60} />
                  </div>
                </a>
              </Link>
            </div>
            <div>
              <div className='font-semibold'>{name}</div>
              <div className='font-light'>
                {new Date(createdAt).toLocaleDateString('ja-JP')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PostMain);
