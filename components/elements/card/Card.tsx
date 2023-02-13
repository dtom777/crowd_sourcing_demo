import BaseIcon from '@/components/atoms/icon/BaseIcon';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Card.module.css';

const Card = ({ post }) => {
  console.log(post);

  return (
    <div className='card w-96 bg-base-100 shadow-xl'>
      <div className='card-body'>
        <h2 className={`card-title ${styles.title}`}>{post.title}</h2>
        <Link href={`/category/${post.categorySlug}`}>
          <a className='text-blue-500 text-xs'>
            <BaseIcon icon={faFolder} className='mx-1' />
            {post.categorySlug}
          </a>
        </Link>
        <p className={styles.desc}>{post.content}</p>
        <div className='card-actions justify-end'>
          <Link href={`/posts/${post.id}`}>
            <a className='btn btn-primary'>Apply</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
