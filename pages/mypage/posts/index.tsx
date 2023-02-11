import { GetServerSideProps, NextPage } from 'next';
import { PostWithComment } from 'types/post.type';
import { Session } from 'next-auth';
import { useState } from 'react';
import { getSession } from 'next-auth/client';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import Layout from '@/components/templates/Layout';
import SearchFormMyPage from '@/components/organisms/mypage/SearchFormMyPage';
import BaseHead from '@/components/atoms/head/BaseHead';
import PostsListWithPaginationMyPage from '@/components/organisms/mypage/posts/PostsListWithPaginationMyPage';
import { ParsedUrlQuery } from 'node:querystring';
import { getAsString } from '../../../utils/getAsString';

type Props = {
  posts: Array<PostWithComment>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session: Session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/signin',
      },
    };
  }

  const query = getAsString(context.query.query);
  const { published, draft, end } = context.query;

  if (!query && published === 'true' && draft === 'true' && end === 'true') {
    // 初期画面　すべてのPostを表示
    const posts = await prisma.post.findMany({
      where: { userId: session.user.id },
      take: 5,
      orderBy: {
        id: 'desc',
      },
      include: { comment: true },
    });

    return {
      props: { posts },
    };
  } else if (published === 'true' && draft === 'false' && end === 'false') {
    // 募集中のみ
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
          {
            userId: session.user.id,
          },
        ],
      },
      take: 5,
      orderBy: {
        id: 'desc',
      },
      include: { comment: true },
    });

    return {
      props: { posts },
    };
  } else if (published === 'false' && draft === 'true' && end === 'false') {
    // 下書きのみ
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
            draft: true,
          },
          {
            userId: session.user.id,
          },
        ],
      },
      take: 5,
      orderBy: {
        id: 'desc',
      },
      include: { comment: true },
    });

    return {
      props: { posts },
    };
  } else if (published === 'false' && draft === 'false' && end === 'true') {
    // 終了
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
            published: false,
          },
          {
            userId: session.user.id,
          },
        ],
      },
      take: 5,
      orderBy: {
        id: 'desc',
      },
      include: { comment: true },
    });

    return {
      props: { posts },
    };
  } else if (published === 'true' && draft === 'true' && end === 'false') {
    // 募集中と下書き
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
            userId: session.user.id,
          },
        ],
      },
      take: 5,
      orderBy: {
        id: 'desc',
      },
      include: { comment: true },
    });

    return {
      props: { posts },
    };
  } else if (published === 'true' && draft === 'false' && end === 'true') {
    // 募集中と終了
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
            // 下書きを除く
            NOT: [
              {
                AND: [{ published: true }, { draft: true }],
              },
            ],
          },
          {
            userId: session.user.id,
          },
        ],
      },
      take: 5,
      orderBy: {
        id: 'desc',
      },
      include: { comment: true },
    });

    return {
      props: { posts },
    };
  } else if (published === 'false' && draft === 'true' && end === 'true') {
    // 下書きと終了
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
            // 募集中を除く
            NOT: [
              {
                AND: [{ published: true }, { draft: false }],
              },
            ],
          },
          {
            userId: session.user.id,
          },
        ],
      },
      take: 5,
      orderBy: {
        id: 'desc',
      },
      include: { comment: true },
    });

    return {
      props: { posts },
    };
  } else {
    // すべて
    const posts = await prisma.post.findMany({
      where: {
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
        userId: session.user.id,
      },
      take: 5,
      orderBy: {
        id: 'desc',
      },
      include: { comment: true },
    });

    return {
      props: { posts },
    };
  }
};

const PostsListPage: NextPage<Props> = ({ posts }) => {
  const [show, setShow] = useState<boolean>(false);

  const toggleModal = (): void => {
    setShow(!show);
  };

  return (
    <Layout>
      <BaseHead />
      <div className='lg:pb-6 lg:px-4 mb-80'>
        <section className='mb-6'>
          <div className='flex justify-between lg:mt-20 py-2 lg:px-0 pl-4 pr-2 lg:bg-white bg-black lg:text-black text-white lg:font-extrabold font-bold lg:text-3xl text-sm'>
            <h2>あなたの募集一覧</h2>
            <div className='lg:hidden table'>
              {show ? (
                <button onClick={toggleModal}>閉じる</button>
              ) : (
                <button onClick={toggleModal}>
                  絞り込む
                  <span className='ml-1 align-middle'>
                    <Image
                      src='/filter-icon.png'
                      width={14}
                      height={14}
                      alt='filter-icon'
                    />
                  </span>
                </button>
              )}
            </div>
          </div>
          <div className='md:my-6 my-2 lg:mx-4 md:mx-16 mx-4 pb-6 border-b'></div>

          <div className='lg:flex lg:mr-5'>
            <div className='lg:hidden block'>
              {show && <SearchFormMyPage />}
            </div>
            <div className='lg:block hidden lg:w-1/3'>
              <SearchFormMyPage />
            </div>
            <div className='lg:w-1/12 hidden lg:block'></div>
            <div className='lg:w-7/12 lg:mx-0 md:mx-16 mx-4'>
              {posts.length === 0 || posts.length === undefined ? (
                <p className='md:text-xl text-sm text-gray-500 text-center my-10'>
                  該当する募集がありません😵‍💫
                </p>
              ) : (
                <PostsListWithPaginationMyPage posts={posts} />
              )}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default PostsListPage;
