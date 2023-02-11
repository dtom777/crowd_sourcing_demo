import dynamic from 'next/dynamic';
import { NextPage } from 'next';

const ReactAdmin = dynamic(() => import('@/components/admin/ReactAdmin'), {
  ssr: false,
});

const index: NextPage = () => <ReactAdmin />;

export default index;
