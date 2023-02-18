import Link from 'next/link';
import { VFC } from 'react';

import getRelativeTime from '@/libs/days';

import Avatar from '../avatar/Avatar';
import ConstMessage from '../const/ConstMessage';

// TODO fix type
type Props = {
  comments: [];
};

const RecentActivity: VFC<Props> = ({ comments }) => {
  return (
    <div className='md:w-1/2 w-full py-4 lg:px-6 px-4 lg:mr-20'>
      <div className='flex justify-between items-baseline'>
        <h2 className='text-lg font-bold'>Recent Activity</h2>
        <Link href='/mypage/chats'>
          <a className='text-gray-400 text-sm hover:opacity-50'>View all</a>
        </Link>
      </div>

      {comments.length ? (
        <ul>
          {comments.map((comment, i) => (
            <li key={i} className='bg-white my-4 p-4'>
              <Link href={`/posts/${comment.post.id}`}>
                <a className='flex justify-between hover:opacity-50'>
                  <div className='flex'>
                    <Avatar
                      src={comment.post.user.image}
                      size={100}
                      className='w-14'
                    />
                    <div className='ml-6'>
                      <p className='w-40 truncate text-gray-900 text-md font-bold'>
                        {comment.post.title}
                      </p>
                      <p className='text-gray-700 font-medium'>
                        {comment.post.user.name}
                      </p>
                      <p className='text-gray-500 md:text-sm text-xs'>
                        You applied for this post
                      </p>
                    </div>
                  </div>
                  <p className='text-gray-500 md:text-sm text-xs'>
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
