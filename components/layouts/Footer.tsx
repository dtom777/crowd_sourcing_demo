import React, { VFC } from 'react';
import Link from 'next/link';

const Footer: VFC = () => {
  return (
    <footer className='footer p-10 bg-neutral text-neutral-content'>
      <div>
        <span className='footer-title'>Services</span>
        <Link href='/help'>
          <a className='link link-hover'>Branding</a>
        </Link>
        <Link href='/help'>
          <a className='link link-hover'>Design</a>
        </Link>
        <Link href='/help'>
          <a className='link link-hover'>Marketing</a>
        </Link>
        <Link href='/help'>
          <a className='link link-hover'>Advertisement</a>
        </Link>
      </div>
      <div>
        <span className='footer-title'>Company</span>
        <Link href='/help'>
          <a className='link link-hover'>About us</a>
        </Link>
        <Link href='/help'>
          <a className='link link-hover'>Contact</a>
        </Link>
        <Link href='/help'>
          <a className='link link-hover'>Jobs</a>
        </Link>
        <Link href='/help'>
          <a className='link link-hover'>Press kit</a>
        </Link>
      </div>
      <div>
        <span className='footer-title'>Legal</span>
        <Link href='/help'>
          <a className='link link-hover'>Terms of use</a>
        </Link>
        <Link href='/help'>
          <a className='link link-hover'>Privacy policy</a>
        </Link>
        <Link href='/help'>
          <a className='link link-hover'>Cookie policy</a>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
