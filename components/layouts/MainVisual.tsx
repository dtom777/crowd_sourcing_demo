import Link from 'next/link';
import { useSession } from 'next-auth/client';

const MainVisual = () => {
  const [session] = useSession();

  return (
    <div
      className='hero'
      style={{
        backgroundImage: `url("/main-visual.jpg")`,
        backgroundSize: 'auto',
      }}
    >
      <div className='hero-overlay bg-opacity-60'></div>
      <div className='hero-content text-center text-neutral-content'>
        <div className=''>
          <h1 className='mb-5 text-5xl font-bold'>Job offers</h1>
          <p className='mb-5'>
            Let&#39;s offer the job and wait for the pros to apply!
          </p>
          <Link href={session ? '/create' : '/auth/signin'}>
            <a className='btn-primary btn'>Get Started</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainVisual;
