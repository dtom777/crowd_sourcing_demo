import { Prisma } from '@prisma/client';

export type CommentWithUserAndPost = Prisma.CommentGetPayload<{
  include: { user: true; post: true };
}>;

export type CommentWithPostAndUser = Prisma.CommentGetPayload<{
  include: {
    post: {
      include: {
        user: {
          select: {
            name: true;
            image: true;
          };
        };
      };
    };
  };
}>;

export type CommentWithUserAndPostWithCategoryAndUser =
  Prisma.CommentGetPayload<{
    include: {
      user: true;
      post: {
        include: {
          Category: true;
          user: true;
        };
      };
    };
  }>;
