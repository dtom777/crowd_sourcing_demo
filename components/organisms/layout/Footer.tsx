import FooterListItems from '@/components/molecules/layout/FooterListItems';
import { memo, VFC } from 'react';

const Footer: VFC = () => {
  return (
    <footer className='pt-4 lg:pb-4 pb-14 px-4 bg-gray-50 text-gray-500'>
      <div className='flex lg:flex-nowrap flex-wrap lg:justify-between overflow-hidden max-w-screen-lg mx-auto md:text-sm text-xs'>
        <FooterListItems lists={lists[0]} />
        <FooterListItems lists={lists[1]} />
        <FooterListItems lists={lists[2]} />{' '}
        <FooterListItems lists={lists[3]} />
      </div>
    </footer>
  );
};

export default memo(Footer);

const lists = [
  [
    { title: 'Crowd Sourcingについて', link: '/help' },
    { title: '********', link: '/help' },
    { title: '********', link: '/help' },
    { title: '********', link: '/help' },
  ],
  [
    { title: '********', link: '/help' },
    { title: '********', link: '/help' },
    { title: '********', link: '/help' },
    { title: '********', link: '/help' },
  ],
  [
    { title: '********', link: '/help' },
    { title: '********', link: '/help' },
    { title: '********', link: '/help' },
    { title: '********', link: '/help' },
  ],
  [
    { title: '********', link: '/help' },
    { title: '********', link: '/help' },
    { title: '********', link: '/help' },
    { title: '********', link: '/help' },
  ],
];
