import Link from 'next/link';
import { signOut, useSession } from 'next-auth/client';
import { VFC } from 'react';

import Avatar from '../elements/avatar/Avatar';
import AvatarSkelton from '../elements/avatar/Skelton';
import SearchForm from '../form/search/Form';

const Navbar: VFC = () => {
  const [session] = useSession();

  const avatar = session ? (
    <Avatar src={session.user.image} size={100} className='w-10' />
  ) : (
    <AvatarSkelton />
  );

  return (
    <div className='w-full navbar bg-base-300'>
      <div className='flex-none'>
        <label htmlFor='my-drawer-3' className='btn btn-square btn-ghost'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            className='inline-block w-6 h-6 stroke-current'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4 6h16M4 12h16M4 18h16'
            ></path>
          </svg>
        </label>
      </div>
      {/* title */}
      <div className='flex-1'>
        <Link href='/'>
          <a className='btn btn-ghost normal-case text-xl'>
            Crowd Sourcing Demo
          </a>
        </Link>
      </div>

      <div className='hidden md:block mr-4'>
        <SearchForm />
      </div>

      {session ? (
        <div className='dropdown dropdown-end'>
          <label tabIndex={0} className='btn btn-ghost btn-circle'>
            {avatar}
          </label>
          <ul
            tabIndex={0}
            className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'
          >
            <li>
              <Link href='/create'>
                <a>Create Post</a>
              </Link>
            </li>
            <li>
              <Link href='/mypage'>
                <a>My Page</a>
              </Link>
            </li>
            <li>
              <Link href='/mypage/settings'>
                <a>Settings</a>
              </Link>
            </li>
            <li>
              <a onClick={() => signOut({ callbackUrl: '/auth/signin' })}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      ) : (
        <>
          <Link href='/auth/signin'>
            <a className='btn'>Sign In</a>
          </Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
