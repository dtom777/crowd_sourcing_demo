import { Prisma } from '@prisma/client';

export type UserWithPost = Prisma.UserGetPayload<{
  include: { posts: true };
}>;

export type UserWithProfile = Prisma.UserGetPayload<{
  include: { profile: true };
}>;

export type SpecificUser = Prisma.UserGetPayload<{
  include: {
    posts: {
      include: {
        category: true;
        user: true;
      };
    };
    profile: true;
  };
}>;

export type UserSelectId = Prisma.UserGetPayload<{
  select: {
    id: true;
  };
}>;
