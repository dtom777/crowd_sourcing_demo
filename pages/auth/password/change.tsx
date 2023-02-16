import { NextPage } from 'next';

import PasswordChangeForm from '@/components/form/auth/password/ChangeForm';

const PasswordChangePage: NextPage = () => {
  return (
    <>
      <PasswordChangeForm />
    </>
  );
};

export default PasswordChangePage;
