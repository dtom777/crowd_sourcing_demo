import { useSession } from 'next-auth/client';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import BaseButton from '@/components/atoms/button/BaseButton';
import BaseIcon from '@/components/atoms/icon/BaseIcon';
import BaseLinkButton from '@/components/atoms/button/BaseLinkButton';
import BaseAvatar from '@/components/atoms/avatar/BaseAvatar';
import SignInLinkButton from '@/components/atoms/button/SignInLinkButton';
import SignUpLinkButton from '@/components/atoms/button/SignUpLinkButton';
import { memo, VFC } from 'react';

const HeaderMenu: VFC = () => {
  const [session, loading] = useSession();
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='mr-2'>
      {session ? (
        <div className='flex items-center'>
          {/* あとでLinkつける */}
          <BaseButton headerStyle={true} growEffect={true}>
            <BaseIcon icon={faEnvelope} className='md:text-xl' />
          </BaseButton>
          {/* あとでLinkつける */}
          <BaseButton headerStyle={true} growEffect={true}>
            <BaseIcon icon={faCheckCircle} className='md:text-xl' />
          </BaseButton>

          <BaseLinkButton href='/mypage' headerStyle={true} growEffect={true}>
            <BaseAvatar src={session.user.image} size={30} />
          </BaseLinkButton>

          <BaseLinkButton
            href='/create'
            squareStyle={true}
            growEffect={true}
            className='bg-black text-white rounded-md'
          >
            <BaseIcon icon={faEdit} className='md:mr-2 mr-1 text-sm' />
            募集する
          </BaseLinkButton>
        </div>
      ) : (
        <>
          <SignInLinkButton />
          <SignUpLinkButton className='ml-2' />
        </>
      )}
    </div>
  );
};

export default memo(HeaderMenu);
