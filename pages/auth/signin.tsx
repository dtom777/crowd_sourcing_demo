import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

import SignInForm from '@/components/form/auth/SignInForm';

const SignInPage: NextPage = () => {
  const router = useRouter();
  const [session] = useSession();
  if (session) {
    router.push('/');

    return null;
  }

  return (
    <>
      <SignInForm />
    </>
  );
};

export default SignInPage;
