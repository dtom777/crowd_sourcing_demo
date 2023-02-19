import { Prisma } from '@prisma/client';

export type PostWithUser = Prisma.PostGetPayload<{
  include: {
    user: true;
  };
}>;

export type PostWithComments = Prisma.PostGetPayload<{
  include: {
    comments: true;
  };
}>;

export type PostWithUserAndLikeAndComment = Prisma.PostGetPayload<{
  include: {
    user: true;
    likes: true;
    comments: true;
  };
}>;

export type PostWithCommentsAndLike = Prisma.PostGetPayload<{
  include: {
    comments: true;
    likes: true;
  };
}>;

export type PostWithUserAndCategory = Prisma.PostGetPayload<{
  include: {
    category: true;
    user: true;
  };
}>;

export type MyPosts = Prisma.PostGetPayload<{
  include: {
    comments: {
      include: {
        user: {
          select: {
            id: true;
            name: true;
            image: true;
          };
        };
      };
    };
  };
}>;

export type ApplicationPosts = Prisma.PostGetPayload<{
  include: {
    comments: {
      include: {
        user: {
          select: {
            id: true;
            name: true;
            image: true;
          };
        };
      };
    };
  };
}>;
