import { useState, memo, useCallback, VFC } from 'react';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import LikeIcon from '@/components/atoms/icon/LikeIcon';
import SignInLinkButton from '@/components/atoms/button/SignInLinkButton';
import BaseModal from '@/components/atoms/modal/BaseModal';
import BaseIcon from '@/components/atoms/icon/BaseIcon';
import { PostWithUser } from 'types/post.type';

type Props = {
  post: PostWithUser;
};

const LikeModal: VFC<Props> = ({ post }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = useCallback((): void => {
    setIsOpen(true);
  }, []);
  const closeModal = useCallback((): void => {
    setIsOpen(false);
  }, []);

  return (
    <div>
      <button
        className='flex justify-center items-center px-3 py-1 rounded-2xl text-gray-400 border border-gray-400 focus:outline-none hover:opacity-50'
        onClick={openModal}
      >
        <BaseIcon icon={faHeart} className='mr-2' />
        いいね
      </button>
      <BaseModal isOpen={isOpen} closeHandler={closeModal}>
        <div className='md:max-w-3xl max-w-xs w-full flex flex-col justify-center items-center z-10 lg:py-12 py-8 md:px-4 text-center bg-white rounded-md'>
          <div className='md:text-2xl font-bold'>
            気に入った募集や、あとで読みたい募集に「いいね」しましょう
          </div>
          <div className='md:text-xl text-base mt-6'>
            TUNORUにログインすると、{post.user.name}
            さんの募集に「いいね」できます。
          </div>
          <LikeIcon />
          <div className='my-4'>
            <SignInLinkButton className='py-4 px-16 bg-blue-500 text-white text-base font-bold border-blue-500' />
          </div>
        </div>
      </BaseModal>
    </div>
  );
};

export default memo(LikeModal);
