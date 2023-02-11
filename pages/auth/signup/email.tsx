import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import BaseHead from '@/components/atoms/head/BaseHead';
import LayoutAuth from '@/components/templates/LayoutAuth';
import SignUpForm from '@/components/organisms/auth/SignUpForm';

const SignUpByEmailPage: NextPage = () => {
  const [session] = useSession();
  const router = useRouter();
  if (session) {
    router.push('/');

    return null;
  }

  return (
    <LayoutAuth>
      <BaseHead />
      <SignUpForm />
    </LayoutAuth>
  );
};

export default SignUpByEmailPage;
