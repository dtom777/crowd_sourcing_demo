import { Prisma } from '@prisma/client';
import Head from 'next/head';
import getConfig from 'next/config';
import { memo, VFC } from 'react';

type PostWithUser = Prisma.PostGetPayload<{ include: { user: true } }>;
type Props = {
  post?: PostWithUser;
};

const BaseHead: VFC<Props> = ({ post }) => {
  const { publicRuntimeConfig } = getConfig();
  const baseUrl = publicRuntimeConfig.WEBAPP_URL;

  return (
    <Head>
      <title>みんなで募ろう!何でも募集サイト ツノル</title>
      {post && (
        <>
          <meta name='description' content={post.content} />
          <meta property='og:title' content={post.title} />
          <meta property='og:description' content={post.content} />
          <meta property='og:image' content={`${baseUrl}/ogp/${post.id}.png`} />
          <meta property='og:url' content={`${baseUrl}/posts/${post.id}`} />
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:site' content='@tunoru' />
          <meta name='twitter:title' content={post.title} />
          <meta name='twitter:creator' content={post.user.name} />
          <meta name='twitter:description' content={post.content} />
          <meta
            name='twitter:image'
            content={`${baseUrl}/ogp/${post.id}.png`}
          />
        </>
      )}
    </Head>
  );
};
export default memo(BaseHead);
