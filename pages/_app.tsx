import { AppProps } from 'next/app';
import '../styles/globals.css';
import { Provider } from 'next-auth/client';
import { motion, AnimateSharedLayout } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '@/components/layouts/Layout';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <AnimateSharedLayout>
      <Provider session={pageProps.session}>
        <ToastContainer />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </motion.div>
      </Provider>
    </AnimateSharedLayout>
  );
};

export default MyApp;
