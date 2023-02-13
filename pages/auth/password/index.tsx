import { NextPage } from 'next';
import BaseHead from '@/components/atoms/head/BaseHead';
import PasswordResetForm from '@/components/organisms/auth/PasswordResetForm';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

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
