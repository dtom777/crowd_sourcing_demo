import Link from 'next/link';
import { memo, VFC } from 'react';

import Avatar from '@/components/elements/avatar/Avatar';

import { PostWithUserAndCategory } from '@/types/post.type';

import AvatarSkelton from '../avatar/Skelton';

type Props = {
  post: PostWithUserAndCategory;
};

const PostMain: VFC<Props> = ({ post }) => {
  const { id, name, image, createdAt } = post.user;

  return (
    <div>
      <div className='w-full rounded-none bg-primary text-neutral-content'>
        <div className='card-body'>
          <h2 className='card-title mb-4 text-2xl'>{post.title}</h2>
          <p className='mb-4'>{post.content}</p>
          <div className='flex justify-between'>
            <div className='card-actions'>
              <div className='badge-outline badge'>
                <Link href={`/category/${post.categorySlug}`}>
                  <a>{post.categorySlug}</a>
                </Link>
              </div>
            </div>
            <div className='card-actions mb-4 font-bold'>
              Reward: {post.reward.toLocaleString()} USD
            </div>
          </div>
          <div className='flex items-center'>
            <div className='mr-2'>
              <Link href={`/users/${id}`}>
                <a className='hover:opacity-50'>
                  <div className='flex w-full flex-col items-center justify-center'>
                    {image ? (
                      <Avatar src={image} size={60} />
                    ) : (
                      <AvatarSkelton />
                    )}
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
