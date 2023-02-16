import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

import PasswordResetForm from '@/components/form/auth/password/ResetForm';

const PasswordResetPage: NextPage = () => {
  const router = useRouter();
  const [session] = useSession();
  if (session) {
    router.push('/');

    return null;
  }

  return (
    <>
      <PasswordResetForm />
    </>
  );
};

export default PasswordResetPage;
