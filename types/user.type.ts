import { Prisma } from '@prisma/client';

export type UserWithPost = Prisma.UserGetPayload<{
  include: { posts: true };
}>;

export type UserWithProfile = Prisma.UserGetPayload<{
  include: { profile: true };
}>;
