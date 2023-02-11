import FooterListItem from '@/components/atoms/layout/FooterListItem';
import { memo, VFC } from 'react';
import { List } from 'types/list.type';

type Props = {
  lists: Array<List>;
};

const FooterListItems: VFC<Props> = ({ lists }) => {
  return (
    <div className='lg:w-full w-1/2 overflow-hidden p-2'>
      <ul>
        {lists.map((list) => {
          return <FooterListItem list={list} key={list.title} />;
        })}
      </ul>
    </div>
  );
};

export default memo(FooterListItems);
