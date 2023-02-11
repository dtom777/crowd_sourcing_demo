import BaseIcon from './BaseIcon';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { memo, VFC } from 'react';

const LikeIcon: VFC = () => {
  return (
    <div className='flex md:my-8 my-4'>
      <div className='mr-10'>
        <p className='text-gray-500 transform rotate-12'>ー</p>
        <p className='text-gray-500'>ー</p>
        <p className='text-gray-500 transform -rotate-12'>ー</p>
      </div>
      <BaseIcon icon={faHeart} className='w-20 h-20 text-7xl text-red-500' />
      <div className='ml-10'>
        <p className='text-gray-500 transform -rotate-12'>ー</p>
        <p className='text-gray-500'>ー</p>
        <p className='text-gray-500 transform rotate-12'>ー</p>
      </div>
    </div>
  );
};

export default memo(LikeIcon);
