import { Prisma } from '@prisma/client';
import getConfig from 'next/config';
import NextHead from 'next/head';
import { memo, VFC } from 'react';

type PostWithUser = Prisma.PostGetPayload<{ include: { user: true } }>;
type Props = {
  post?: PostWithUser;
};

const Head: VFC<Props> = ({ post }) => {
  const { publicRuntimeConfig } = getConfig();
  const baseUrl = publicRuntimeConfig.WEBAPP_URL;

  return (
    <NextHead>
      <title>Crowd Sourcing Demo</title>
      {post && (
        <>
          <meta name='description' content={post.content} />
          <meta property='og:title' content={post.title} />
          <meta property='og:description' content={post.content} />
          <meta property='og:url' content={`${baseUrl}/posts/${post.id}`} />
        </>
      )}
    </NextHead>
  );
};
export default memo(Head);
