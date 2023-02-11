import { Prisma } from '@prisma/client';

export type PostWithUser = Prisma.PostGetPayload<{
  include: {
    user: true;
  };
}>;

export type PostWithTags = Prisma.PostGetPayload<{
  include: {
    tags: {
      include: {
        tag: true;
      };
    };
  };
}>;

export type PostWithComment = Prisma.PostGetPayload<{
  include: {
    comment: true;
  };
}>;

export type PostWithUserAndLikeAndComment = Prisma.PostGetPayload<{
  include: {
    user: true;
    Like: true;
    comment: true;
  };
}>;

export type PostWithCommentAndLike = Prisma.PostGetPayload<{
  include: {
    comment: true;
    Like: true;
  };
}>;

export type PostWithUserAndTags = Prisma.PostGetPayload<{
  include: {
    user: true;
    tags: {
      include: {
        tag: true;
      };
    };
  };
}>;

export type PostWithUserAndCategoryAndTags = Prisma.PostGetPayload<{
  include: {
    Category: true;
    user: true;
    tags: {
      include: {
        tag: true;
      };
    };
  };
}>;

export type CreatePost = {
  title: string;
  content: string;
  categoryId: number;
  reward: number;
  rewardFree: boolean;
  tags: string;
  published: boolean;
  draft: boolean;
  userId: string;
};
