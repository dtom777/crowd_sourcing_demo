import Image from 'next/image';
import styles from './MainVisual.module.css';
import BaseLinkButton from '@/components/atoms/button/BaseLinkButton';
import { memo, VFC } from 'react';

const MainVisual: VFC = () => {
  return (
    <div className='text-center mb-10 ml-4'>
      <Image
        src='/main-visual.png'
        width={544}
        height={400}
        alt='main-visual'
      />
      <div className='flex justify-center items-center'>
        <BaseLinkButton
          href={{ pathname: '/category', query: { rewardFree: true } }}
          className={`md:w-96 w-80 lg:inline-block lg:mb-0 mb-2 mr-4 py-2 bg-black text-white font-bold rounded-3xl ${styles.button}`}
        >
          募集をさがす
        </BaseLinkButton>
      </div>
    </div>
  );
};

export default memo(MainVisual);
