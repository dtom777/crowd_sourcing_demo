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
      <title>Crowd Sourcing Demo</title>
      {post && (
        <>
          <meta name='description' content={post.content} />
          <meta property='og:title' content={post.title} />
          <meta property='og:description' content={post.content} />
          <meta property='og:url' content={`${baseUrl}/posts/${post.id}`} />
        </>
      )}
    </Head>
  );
};
export default memo(BaseHead);
