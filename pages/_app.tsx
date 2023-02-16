import { motion, AnimateSharedLayout } from 'framer-motion';
import { AppProps } from 'next/app';
import '../styles/globals.css';
import { Provider as NextAuthProvider } from 'next-auth/client';
import { Provider as ReduxProvider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { store } from '@/stores/store';

import Layout from '@/components/layouts/Layout';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ReduxProvider store={store}>
      <AnimateSharedLayout>
        <NextAuthProvider session={pageProps.session}>
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
        </NextAuthProvider>
      </AnimateSharedLayout>
    </ReduxProvider>
  );
};

export default MyApp;
