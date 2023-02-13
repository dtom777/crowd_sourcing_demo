import { NextPage } from 'next';
import BaseHead from '@/components/atoms/head/BaseHead';
import PasswordChangeForm from '@/components/organisms/auth/PasswordChangeForm';

const PasswordChangePage: NextPage = () => {
  return (
    <>
      <PasswordChangeForm />
    </>
  );
};

export default PasswordChangePage;
