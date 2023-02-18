import Link from 'next/link';
import React, { VFC } from 'react';

import { FOOTER_LIST } from '@/constants/footer';

const Footer: VFC = () => {
  return (
    <footer className='footer bg-neutral p-10 text-neutral-content'>
      {FOOTER_LIST.map((item, i) => (
        <div key={i}>
          <span className='footer-title'>{item.title}</span>
          {item.links.map((link, j) => (
            <Link key={j} href={link.href}>
              <a className='link-hover link'>{link.linkTitle}</a>
            </Link>
          ))}
        </div>
      ))}
    </footer>
  );
};

export default Footer;
