import Image from 'next/image';
import Link from 'next/link';
import { VFC } from 'react';

import getRelativeTime from '@/libs/days';

import ConstMessage from '../const/ConstMessage';

type Props = {
  title: string;
  posts: []; // TODO fix
  position: 'left' | 'right';
};

const Chat: VFC<Props> = ({ title, posts, position }) => {
  const chatClassName = position === 'left' ? 'chat-start' : 'chat-end';
  const titleClassName = position === 'left' ? '' : 'text-right';

  return (
    <div className='mx-2 bg-base-200 lg:w-1/2'>
      <h3 className='p-4 text-2xl font-bold underline'>{title}</h3>
      {/* chat */}

      {posts?.some(({ comments }) => comments.length) ? (
        <>
          {posts?.map((post) => (
            <>
              {post.comments.length ? (
                <div
                  key={post.id}
                  className='bg-bg-post my-4 mx-2 rounded-md px-4'
                >
                  <div
                    className={`block truncate text-xl font-bold text-gray-900 ${titleClassName}`}
                  >
                    {post.title}
                  </div>
                  <div className={`chat ${chatClassName}`}>
                    <div className='chat-image avatar'>
                      <div className='w-10 rounded-full'>
                        <Link href={`/users/${post.comments[0].user.id}`}>
                          <a className='hover:opacity-50'>
                            <Image
                              src={post.comments[0].user.image}
                              width={60}
                              height={60}
                            />
                          </a>
                        </Link>
                      </div>
                    </div>
                    <div className='chat-header'>
                      {post.comments[0].user.name}
                      <time className='ml-4 text-xs opacity-50'>
                        {getRelativeTime(post)}
                      </time>
                    </div>
                    <div className='chat-bubble'>
                      {post.comments[0].content}
                    </div>
                  </div>

                  <p className='mr-4 text-sm text-gray-500'></p>
                </div>
              ) : null}
            </>
          ))}
        </>
      ) : (
        <ConstMessage message='No applications yet' />
      )}

      {/*  */}
    </div>
  );
};

export default Chat;
