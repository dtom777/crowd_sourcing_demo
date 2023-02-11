import { useSession } from 'next-auth/client';
import BaseLinkButton from '@/components/atoms/button/BaseLinkButton';
import { memo, VFC } from 'react';

type Props = {
  title: string;
  buttonTitle: string;
};
const Banner: VFC<Props> = ({ title, buttonTitle }) => {
  const [session] = useSession();

  return (
    <>
      {/* {session === null || session === undefined ? ( */}
      {!session && (
        <div className='w-screen' style={{ margin: '0 calc(50% - 50vw)' }}>
          <div className='w-full flex lg:flex-col z-20 lg:static fixed bottom-0 justify-around items-center bg-white lg:py-28 py-4 lg:bg-banner-login bg-cover'>
            <h2 className='lg:mb-14 lg:text-4xl text-sm lg:text-white lg:font-bold font-semibold'>
              {title}
            </h2>
            <BaseLinkButton
              href='/auth/signin'
              className='lg:bg-white bg-black lg:text-black text-white lg:text-xl text-sm font-bold lg:py-2 py-1 lg:px-10 px-3 rounded-3xl  hover:bg-blue-500 hover:border-blue-500 hover:text-white'
              growEffect={true}
            >
              {buttonTitle}
            </BaseLinkButton>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(Banner);
