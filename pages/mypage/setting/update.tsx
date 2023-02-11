import { NextPage } from 'next';
import Layout from '@/components/templates/Layout';
import BaseHead from '@/components/atoms/head/BaseHead';
import EmailUpdateForm from '@/components/organisms/mypage/setting/EmailUpdateForm';

const EmailUpdatePage: NextPage = () => {
  return (
    <Layout>
      <BaseHead />
      <EmailUpdateForm />
    </Layout>
  );
};

export default EmailUpdatePage;
