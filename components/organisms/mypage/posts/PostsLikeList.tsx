import { PostWithUserAndLikeAndComment } from 'types/post.type';
import { Session } from 'next-auth';
import { faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import BaseIcon from '@/components/atoms/icon/BaseIcon';
import BaseLinkButton from '@/components/atoms/button/BaseLinkButton';
import AvatarWithNameAndCreatedAt from '@/components/molecules/avatar/AvatarWithNameAndCreatedAt';
import { memo, VFC } from 'react';
import { errorToast } from '@/lib/toast';

type Props = {
  posts: Array<PostWithUserAndLikeAndComment>;
  session: Session;
};

const PostsLikeList: VFC<Props> = ({ posts, session }) => {
  const router = useRouter();

  const handleDisLike = async (id: string): Promise<void> => {
    const body: { like: boolean; postId: string; userId: string } = {
      like: false,
      postId: id,
      userId: session.user.id,
    };
    try {
      await fetch('/api/like/createLike', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      });
      router.reload();
    } catch (error) {
      errorToast(error.message);
    }
  };

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id} className='pt-4'>
          <div className='flex justify-between'>
            <BaseLinkButton
              href={`/posts/${post.id}`}
              className='hover:opacity-50'
            >
              <p className='inline-block py-1 px-3 bg-black text-white rounded-2xl'>
                募集
              </p>
              <div className='py-1 font-bold text-gray-800 text-xl'>
                {post.title}
              </div>
              <p className='block truncate py-1 text-sm'>{post.content}</p>
            </BaseLinkButton>
            <div className='flex flex-col items-end justify-center'>
              <button
                className='flex justify-center items-center py-1 text-lg text-gray-500 focus:outline-none hover:opacity-50'
                onClick={() => handleDisLike(post.id)}
              >
                <BaseIcon icon={faHeartBroken} className='mr-2' />
                いいね解除
              </button>
              {post.comment.find((com) => com.userId == session.user.id) ? (
                <div className='text-sm text-blue-500 font-semibold'>
                  応募・済
                </div>
              ) : (
                <div className='text-sm text-red-500 font-semibold'>
                  応募・未
                </div>
              )}
            </div>
          </div>
          <AvatarWithNameAndCreatedAt post={post} />
          <hr className='mt-1' />
        </li>
      ))}
    </ul>
  );
};

export default memo(PostsLikeList);
