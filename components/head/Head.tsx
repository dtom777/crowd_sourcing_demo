import NextHead from 'next/head';
import { memo, VFC } from 'react';

const Head: VFC = () => {
  return (
    <NextHead>
      <title>Crowd Sourcing Demo</title>
      <meta name='description' content='Crowd Sourcing Demo' />
      <meta property='og:title' content='Crowd Sourcing Demo' />
      <meta property='og:description' content='Crowd Sourcing Demo' />
      <meta property='og:url' />
    </NextHead>
  );
};
export default memo(Head);
