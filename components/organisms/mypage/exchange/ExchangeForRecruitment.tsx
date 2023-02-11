import getRelativeTime from '@/lib/days';
import BaseLinkButton from '@/components/atoms/button/BaseLinkButton';
import BaseAvatar from '@/components/atoms/avatar/BaseAvatar';
import styles from './Exchange.module.css';
import { memo, VFC } from 'react';
import { CommentWithUserAndPost } from '../../../../types/comment.type';

type Props = {
  comments: Array<CommentWithUserAndPost>;
};

// 募集したpostでのやりとり
const ExchangeForRecruitment: VFC<Props> = ({ comments }) => {
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
                href={`/mypage/exchange/recruitment/${comment.id}`}
              >
                <a className='hover:opacity-50'>
                  <div className='block truncate text-gray-900 font-bold text-lg text-right'>
                    {comment.post.title}
                  </div>
                  <div className='flex justify-start'>
                    <BaseAvatar src={comment.user.image} size={90} />
                    <div>
                      <p className='text-gray-900 font-medium'>
                        {comment.user.name} さん
                      </p>
                      <div className={styles.balloonLeft}>
                        <p className='text-gray-500'>{comment.content}</p>
                      </div>
                      <p className='text-gray-500 text-sm ml-4'>
                        {getRelativeTime(comment)}
                      </p>
                    </div>
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

export default memo(ExchangeForRecruitment);
