import { Prisma } from '@prisma/client';

export type UserWithPost = Prisma.UserGetPayload<{
  include: { posts: true };
}>;
