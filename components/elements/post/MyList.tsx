import {
  faComments,
  faEdit,
  faTrashAlt,
} from '@fortawesome/free-regular-svg-icons';
import Link from 'next/link';
import { memo, VFC } from 'react';

import { usePostMyPage } from '@/hooks/usePostMyPage';

import Icon from '@/components/elements/icon/Icon';

import { PostWithComments } from 'types/post.type';

type Props = {
  posts: Array<PostWithComments>;
};

const MyPostList: VFC<Props> = ({ posts }) => {
  const { localData, handleTogglePublished, handleDeletePost } =
    usePostMyPage(posts);

  return (
    <>
      <div className='overflow-x-auto'>
        <table className='table w-full'>
          <thead>
            <tr>
              <th>No.</th>
              <th>Title</th>
              <th>Reward</th>
              <th>Status</th>
              <th>Published</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {localData.map((post, index) => (
              <tr key={post.id}>
                <th>{index + 1}</th>
                <td className='w-2 truncate md:w-10'>{post.title}</td>
                <td>{post.reward.toLocaleString()} USD</td>
                <td>
                  {post.comments.length ? (
                    <p className='text-red-400'>
                      <Icon icon={faComments} className='mr-1' />
                      {post.comments.length} application received
                    </p>
                  ) : (
                    <p className='text-gray-400'>No application</p>
                  )}
                </td>
                <td>
                  <div className='form-control'>
                    <label className='label cursor-pointer'>
                      <input
                        type='checkbox'
                        className='toggle-accent toggle'
                        defaultChecked={post.published}
                        onClick={() =>
                          handleTogglePublished(post.id, post.published)
                        }
                      />
                    </label>
                  </div>
                </td>
                <td>
                  <Link href={`/mypage/posts/edit/${post.id}`}>
                    <a className='mr-2 text-blue-500 hover:opacity-50 focus:outline-none'>
                      <Icon icon={faEdit} className='mr-1' />
                    </a>
                  </Link>
                </td>
                <td>
                  <button
                    className='rounded-sm px-2 py-1 text-red-500 hover:opacity-50 focus:outline-none'
                    onClick={() => handleDeletePost(post.id)}
                  >
                    <Icon icon={faTrashAlt} className='mr-1' />
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

export default memo(MyPostList);
