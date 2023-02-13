import { NextPage } from 'next';
import BaseHead from '@/components/atoms/head/BaseHead';
import EmailUpdateForm from '@/components/organisms/mypage/setting/EmailUpdateForm';

const EmailUpdatePage: NextPage = () => {
  return (
    <>
      <EmailUpdateForm />
    </>
  );
};

export default EmailUpdatePage;
