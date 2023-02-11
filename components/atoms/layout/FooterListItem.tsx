import styles from './FooterListItem.module.css';
import Link from 'next/link';
import { memo, VFC } from 'react';
import { List } from 'types/list.type';

type Props = {
  list: List;
};

const FooterListItem: VFC<Props> = ({ list }) => {
  return (
    <li className='leading-loose cursor-pointer'>
      <Link href={list.link} passHref>
        <a className={styles.shine}>{list.title}</a>
      </Link>
    </li>
  );
};

export default memo(FooterListItem);
