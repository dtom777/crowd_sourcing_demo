import Link from 'next/link';
import { VFC } from 'react';

import getRelativeTime from '@/libs/days';

import { CommentWithPostAndUser } from '@/types/comment.type';

import Avatar from '../avatar/Avatar';
import ConstMessage from '../const/ConstMessage';

type Props = {
  comments: Array<CommentWithPostAndUser>;
};

const RecentActivity: VFC<Props> = ({ comments }) => {
  return (
    <div className='w-full py-4 px-4 md:w-1/2 lg:px-6'>
      <div className='flex items-baseline justify-between'>
        <h2 className='text-lg font-bold'>Recent Activity</h2>
        <Link href='/mypage/chats'>
          <a className='text-sm text-gray-400 hover:opacity-50'>View all</a>
        </Link>
      </div>

      {comments?.length ? (
        <ul>
          {comments.map((comment, i) => (
            <li key={i} className='my-4 bg-white p-4'>
              <Link href={`/posts/${comment.post.id}`}>
                <a className='flex justify-between hover:opacity-50'>
                  <div className='flex'>
                    <Avatar
                      src={
                        comment?.post.user.image
                          ? comment.post.user.image
                          : '/avatar-default.png'
                      }
                      size={100}
                      className='w-14'
                    />
                    <div className='ml-6'>
                      <p className='text-md w-40 truncate font-bold text-gray-900'>
                        {comment.post.title}
                      </p>
                      <p className='font-medium text-gray-700'>
                        {comment.post.user.name}
                      </p>
                      <p className='text-xs text-gray-500 md:text-sm'>
                        You applied for this post
                      </p>
                    </div>
                  </div>
                  <p className='text-xs text-gray-500 md:text-sm'>
                    {getRelativeTime(comment)}
                  </p>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <ConstMessage message='No recent activity' />
      )}
    </div>
  );
};

export default RecentActivity;
