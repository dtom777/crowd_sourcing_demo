import { PrismaClient } from '@prisma/client';
import { Session } from 'next-auth';

import type { UserWithProfile } from '@/types/user.type';

const getUserWithProfile = async (prisma: PrismaClient, session: Session) => {
  const user: UserWithProfile | null = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      profile: true,
    },
  });

  return user;
};

export default getUserWithProfile;
