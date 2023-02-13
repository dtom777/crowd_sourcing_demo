import Link from 'next/link';
import styles from './CardsListItem.module.css';
import BaseAvatar from '../avatar/BaseAvatar';
import { memo, VFC } from 'react';
import { PostWithUser } from 'types/post.type';
import { post } from 'cypress/types/jquery';
import BaseIcon from '../icon/BaseIcon';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { categories } from 'constants/category';
import { useRouter } from 'next/router';
import Card from '@/components/elements/card/Card';

type Props = {
  post: PostWithUser;
};

const CardsListItem: VFC<Props> = ({ post }) => {
  return (
    <>
      <Card post={post} />
    </>
  );
};

export default memo(CardsListItem);
