import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { Post } from '@prisma/client';
import Link from 'next/link';
import { FC } from 'react';

import Icon from '@/components/elements/icon/Icon';

import styles from './Card.module.css';

type Props = {
  post: Post;
};

const Card: FC<Props> = ({ post }) => {
  return (
    <div className='card w-96 bg-base-100 shadow-xl'>
      <div className='card-body'>
        <h2 className={`card-title ${styles.title}`}>{post.title}</h2>
        <Link href={`/category/${post.categorySlug}`}>
          <a className='text-xs text-blue-500'>
            <Icon icon={faFolder} className='mx-1' />
            {post.categorySlug}
          </a>
        </Link>
        <p className={styles.desc}>{post.content}</p>
        <div className='card-actions justify-end'>
          <Link href={`/posts/${post.id}`}>
            <a className='btn-primary btn'>Apply</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
