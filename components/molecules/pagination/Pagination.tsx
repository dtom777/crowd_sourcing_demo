import ReactPaginate from 'react-paginate';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import BaseIcon from '@/components/atoms/icon/BaseIcon';
import styles from './Pagination.module.css';
import { memo, VFC } from 'react';

type Props = {
  pageCount: number;
  onPageChange: (e: any) => void;
};

const Pagination: VFC<Props> = ({ pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      previousLabel={<BaseIcon icon={faAngleLeft} />}
      nextLabel={<BaseIcon icon={faAngleRight} />}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={onPageChange}
      containerClassName='flex justify-center mx-4 font-bold text-gray-400 mt-8'
      pageClassName={`px-5 ${styles.shine}`}
      pageLinkClassName='appearance-none'
      activeClassName={`active font-bold text-black ${styles.active}`}
      previousLinkClassName={styles.shine}
      nextLinkClassName={styles.shine}
      disabledClassName='hidden'
    />
  );
};

export default memo(Pagination);
