import { AppProps } from 'next/app';
import '../styles/globals.css';
import { Provider } from 'next-auth/client';
import { motion, AnimateSharedLayout } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
          <Component {...pageProps} />
        </motion.div>
      </Provider>
    </AnimateSharedLayout>
  );
};

export default MyApp;
