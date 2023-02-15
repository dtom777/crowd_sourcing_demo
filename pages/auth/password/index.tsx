import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

import PasswordResetForm from '@/components/organisms/auth/PasswordResetForm';


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
