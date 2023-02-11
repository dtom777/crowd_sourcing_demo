import CardsListItems from '@/components/molecules/card/CardsListItems';
import { memo, VFC } from 'react';
import { PostWithUser } from 'types/post.type';
import SearchForm from '../search/SearchForm';

type Props = {
  posts: Array<PostWithUser>;
};

const CardList: VFC<Props> = ({ posts }) => {
  return (
    <>
      <SearchForm />
      {posts.length && (
        <div className='mb-6'>
          <CardsListItems posts={posts} />
        </div>
      )}
    </>
  );
};

export default memo(CardList);
