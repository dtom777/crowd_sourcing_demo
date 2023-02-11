import BaseLinkButton from '@/components/atoms/button/BaseLinkButton';
import { memo, VFC } from 'react';
import { PostWithUserAndCategoryAndTags } from 'types/post.type';

type Props = {
  post: PostWithUserAndCategoryAndTags;
};

const PostDetails: VFC<Props> = ({ post }) => {
  // @ts-ignore　tagがtagsOnPostと認識されている
  const tagArray = post.tags.map((tag) => tag.name);

  return (
    <>
      <div className='py-2 px-4 bg-black lg:text-lg text-sm text-white font-bold'>
        募集内容
      </div>
      <div
        className='md:p-10 p-4 bg-yellow-300 bg-bg-post'
        style={{ backgroundSize: '600px 920px' }}
      >
        <div className='flex justify-center lg:text-4xl text-2xl font-black break-all whitespace-pre-wrap '>
          <h1 className='max-w-md'>{post.title}</h1>
        </div>
        <div className='mt-6 lg:text-base text-sm font-bold leading-normal'>
          <pre className='break-all whitespace-pre-wrap'>{post.content}</pre>
          <div className='mt-6'>
            {post.reward && post.reward != 0 ? (
              <p>報酬:{post.reward.toLocaleString()}円</p>
            ) : (
              ''
            )}
          </div>
          {tagArray &&
            tagArray.map((tag) => (
              <BaseLinkButton
                href={`/search?query=${tag}&rewardFree=true`}
                className='hover:opacity-50'
                key={tag}
              >
                #{tag}
              </BaseLinkButton>
            ))}
          <div className='mt-4'>
            <BaseLinkButton
              href={`/category/${post.Category.slug}`}
              className='py-1 px-2 bg-gray-200 rounded-md hover:opacity-70'
            >
              カテゴリ:{post.Category.name}
            </BaseLinkButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(PostDetails);
