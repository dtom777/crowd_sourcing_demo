import { NextPage } from 'next';
import LayoutAuth from '@/components/templates/LayoutAuth';
import BaseHead from '@/components/atoms/head/BaseHead';
import PasswordChangeForm from '@/components/organisms/auth/PasswordChangeForm';

const PasswordChangePage: NextPage = () => {
  return (
    <LayoutAuth>
      <BaseHead />
      <PasswordChangeForm />
    </LayoutAuth>
  );
};

export default PasswordChangePage;
