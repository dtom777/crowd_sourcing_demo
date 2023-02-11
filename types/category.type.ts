import { Prisma } from '@prisma/client';

export type CategoryWithPost = Prisma.CategoryGetPayload<{
  include: {
    posts: true;
  };
}>;
