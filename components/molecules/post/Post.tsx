import BaseLinkButton from '@/components/atoms/button/BaseLinkButton';
import AvatarWithNameAndCreatedAt from '../avatar/AvatarWithNameAndCreatedAt';
import { memo, VFC } from 'react';
import { PostWithUser } from 'types/post.type';
import BaseAvatar from '@/components/atoms/avatar/BaseAvatar';
import BaseIcon from '@/components/atoms/icon/BaseIcon';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

type Props = {
  post: PostWithUser;
};

const Post: VFC<Props> = ({ post }) => {
  return (
    <>
      <li className='flex mb-4 border-2 w-full'>
        <div className='w-3/4 mr-2'>
          <div className='p-4 h-40 justify-center items-center bg-white-300 text-lg'>
            <Link href={`/posts/${post.id}`}>
              <a className='font-bold block truncate'>{post.title}</a>
            </Link>
            <Link href={`/category`}>
              <a className='text-blue-500 text-xs'>
                <BaseIcon icon={faFolder} className='mx-1' />
                {/* TODO カテゴリをPOSTから取得 */}
                プログラミング
              </a>
            </Link>
            <p className='block truncate text-sm break-words'>{post.content}</p>
            <div className='flex mt-8'>
              <div className='-mt-3'>
                <BaseAvatar src={post.user.image} size={40} />
              </div>
              <p className='font-medium ml-2 -mt-2'>{post.user.name}</p>
            </div>
          </div>
        </div>
        <div className='w-1/4 border-l-2 my-4 flex flex-col justify-center items-center'>
          <p className='mb-4 border border-blue-500 text-white bg-blue-500 px-2 py-1 rounded-md'>
            報酬
          </p>
          <p className='font-bold text-red-500 text-xl'>
            {post.reward.toLocaleString()}USD
          </p>
        </div>
      </li>
    </>
  );
};

export default memo(Post);
