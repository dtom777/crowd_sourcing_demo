import getRelativeTime from '@/lib/days';
import BaseLinkButton from '@/components/atoms/button/BaseLinkButton';
import BaseAvatar from '@/components/atoms/avatar/BaseAvatar';
import styles from './Exchange.module.css';
import { memo, VFC } from 'react';
import { CommentWithPostWithUser } from 'types/comment.type';

type Props = {
  comments: Array<CommentWithPostWithUser>;
};

// 応募したpostでのやりとり
const ExchangeForApplication: VFC<Props> = ({ comments }) => {
  return (
    <>
      {comments.length !== 0 ? (
        <ul>
          {comments.map((comment) => (
            <li
              key={comment.id}
              className='bg-yellow-300 bg-bg-post my-4 mx-6 p-4 rounded-md'
            >
              <BaseLinkButton
                href={`/mypage/exchange/application/${comment.id}`}
              >
                <a className='hover:opacity-50'>
                  <div className='block truncate text-gray-900 font-bold text-lg'>
                    {comment.post.title}
                  </div>
                  <div className='flex justify-end'>
                    <div>
                      <p className='text-gray-900 font-medium text-right'>
                        あなた
                      </p>
                      <div className={styles.balloonRight}>
                        <p className='text-gray-500'>{comment.content}</p>
                      </div>
                      <p className='text-gray-500 text-sm mr-4 text-right'>
                        {getRelativeTime(comment)}
                      </p>
                    </div>
                    <BaseAvatar src={comment.post.user.image} size={90} />
                  </div>
                </a>
              </BaseLinkButton>
            </li>
          ))}
        </ul>
      ) : (
        <div className='flex justify-center items-center'>
          <p className='text-gray-500 my-10'>現在のやりとりはありません</p>
        </div>
      )}
    </>
  );
};

export default memo(ExchangeForApplication);
