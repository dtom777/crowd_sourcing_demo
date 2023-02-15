import { faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { Session } from 'next-auth';
import { memo, useEffect, useState, VFC } from 'react';

import { errorToast } from '@/libs/toast';

import BaseIcon from '@/components/elements/icon/Icon';

import { PostWithUserAndLikeAndComment } from 'types/post.type';

type Props = {
  posts: Array<PostWithUserAndLikeAndComment>;
  session: Session;
};

const PostsLikeList: VFC<Props> = ({ posts, user }) => {
  const [localData, setLocalData] = useState([]);

  useEffect(() => {
    setLocalData(posts);
  }, [posts]);

  const deleteLike = async (id: string): Promise<void> => {
    const body: { like: boolean; postId: string } = {
      like: false,
      postId: id,
    };
    try {
      await fetch('/api/like/toggle', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      });
      setLocalData((prev) => prev.filter((post) => post.id !== id));
    } catch (error) {
      errorToast(error.message);
    }
  };

  return (
    <>
      <div className='overflow-x-auto'>
        <table className='table w-full'>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Title</th>
              <th>Status</th>
              <th>Favorite</th>
            </tr>
          </thead>
          <tbody>
            {localData.map((post, index) => (
              <tr key={post.id}>
                <th>{index + 1}</th>

                <td>{post.user.name}</td>
                <td className='w-2 md:w-10 truncate'>
                  <Link href={`/posts/${post.id}`}>
                    <a>{post.title}</a>
                  </Link>
                </td>
                <td>
                  {post.comments.find((com) => com.userId == user.id) ? (
                    <p className='text-sm text-blue-500 font-semibold'>
                      Applied
                    </p>
                  ) : (
                    <p className='text-sm text-red-500 font-semibold'>
                      Unrequested
                    </p>
                  )}
                </td>
                <td className='flex justify-center'>
                  <button
                    className='flex justify-center items-center py-1 text-lg text-gray-500 focus:outline-none hover:opacity-50'
                    onClick={() => deleteLike(post.id)}
                  >
                    <BaseIcon icon={faHeartBroken} className='mr-2' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default memo(PostsLikeList);
