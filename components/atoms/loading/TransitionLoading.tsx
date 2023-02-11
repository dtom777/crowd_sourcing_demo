import { useRouter } from 'next/router';
import { useEffect, useState, VFC, memo } from 'react';
import ReactLoading from 'react-loading';

const TransitionLoading: VFC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && setLoading(true);
    const handleComplete = (url: string) =>
      url !== router.asPath && setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router.asPath, router.events]);

  return (
    <>
      {loading && (
        <div className='w-full h-full flex fixed top-0 left-0 justify-center items-center z-30'>
          <section className='absolute z-50 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
            <ReactLoading
              type='spin'
              color='#000'
              height='300px'
              width='300px'
            />
          </section>
        </div>
      )}
    </>
  );
};

export default memo(TransitionLoading);
