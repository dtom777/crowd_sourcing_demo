import Layout from '@/components/templates/Layout';
import BaseHead from '@/components/atoms/head/BaseHead';
import { NextPage } from 'next';

const HelpPage: NextPage = () => {
  return (
    <Layout>
      <BaseHead />
      <div>テスト</div>
    </Layout>
  );
};

export default HelpPage;
