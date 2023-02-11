import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { prisma } from '@/lib/prisma';
import Layout from '@/components/templates/Layout';
import SearchForm from '@/components/organisms/search/SearchForm';
import BaseHead from '@/components/atoms/head/BaseHead';
import Const from '@/components/atoms/const/Const';
import PostsListWithPagination from '@/components/organisms/post/PostsListWithPagination';
import { PostWithUser } from 'types/post.type';
import { useSearchPage } from '@/hooks/useSearchPage';

type Query = {
  query?: string;
  categoryId?: string;
  rewardFree?: string;
};

type Props = {
  posts: Array<PostWithUser>;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context: GetServerSidePropsContext
) => {
  const { query, categoryId, rewardFree }: Query = context.query;
  if (!categoryId && !rewardFree) {
    const posts = await prisma.post.findMany({
      where: {
        AND: [
          {
            OR: [
              {
                title: {
                  contains: query,
                },
              },
              {
                content: {
                  contains: query,
                },
              },
              {
                tags: {
                  some: {
                    tag: {
                      name: {
                        contains: query,
                      },
                    },
                  },
                },
              },
            ],
          },
          {
            published: true,
          },
          {
            draft: false,
          },
        ],
      },
      take: 20,
      include: { user: true },
    });

    return {
      props: { posts },
    };
  } else if (!categoryId) {
    console.log('カテゴリないとき');
    const posts = await prisma.post.findMany({
      where: {
        AND: [
          {
            OR: [
              {
                title: {
                  contains: query,
                },
              },
              {
                content: {
                  contains: query,
                },
              },
              {
                tags: {
                  some: {
                    tag: {
                      name: {
                        contains: query,
                      },
                    },
                  },
                },
              },
            ],
          },
          {
            rewardFree: rewardFree.toLowerCase() === 'true',
          },
          {
            published: true,
          },
          {
            draft: false,
          },
        ],
      },
      take: 20,
      include: { user: true },
    });

    return {
      props: { posts },
    };
  } else {
    const posts = await prisma.post.findMany({
      where: {
        AND: [
          {
            OR: [
              {
                title: {
                  contains: query,
                },
              },
              {
                content: {
                  contains: query,
                },
              },
              {
                tags: {
                  some: {
                    tag: {
                      name: {
                        contains: query,
                      },
                    },
                  },
                },
              },
            ],
          },
          {
            categoryId: Number(categoryId),
          },
          {
            rewardFree: rewardFree.toLowerCase() === 'true',
          },
          {
            published: true,
          },
          {
            draft: false,
          },
        ],
      },
      take: 20,
      include: { user: true },
    });

    return {
      props: { posts },
    };
  }
};

const SearchPage: NextPage<Props> = ({ posts }) => {
  const { show, query, categoryName, toggleModal } = useSearchPage();

  return (
    <Layout>
      <BaseHead />

      <div className='mb-6'>
        <div className='flex justify-between lg:mt-20 py-2 px-4 lg:bg-white bg-black lg:text-black text-white lg:font-extrabold font-bold lg:text-3xl text-sm'>
          <div className='flex items-center'>
            {query ? (
              <h2>{query}　の検索結果</h2>
            ) : (
              <h2>{categoryName}　の検索結果</h2>
            )}
            <p className='ml-6 lg:text-lg'>{posts.length}件</p>
          </div>
          <div className='lg:hidden'>
            {show ? (
              <button onClick={toggleModal}>閉じる</button>
            ) : (
              <button onClick={toggleModal}>絞り込む</button>
            )}
          </div>
        </div>

        <div className='lg:flex lg:mx-5'>
          <div className='lg:hidden block'>{show && <SearchForm />}</div>
          <div className='lg:block hidden lg:w-1/3'>
            <SearchForm />
          </div>
          <div className='lg:w-2/3 lg:ml-12 lg:mr-0 mx-4'>
            {posts.length === 0 || posts.length === undefined ? (
              <Const message='まだ投稿がありません。最初につのりませんか？' />
            ) : (
              <PostsListWithPagination posts={posts} />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
