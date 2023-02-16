import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

import SignUpForm from '@/components/form/auth/SignUpForm';

const SignUpPage: NextPage = () => {
  const router = useRouter();
  const [session] = useSession();
  if (session) {
    router.push('/');

    return null;
  }

  return (
    <>
      <SignUpForm />
    </>
  );
};

export default SignUpPage;
