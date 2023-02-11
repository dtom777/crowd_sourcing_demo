import ReactLoading from 'react-loading';
import { memo, VFC } from 'react';

type Props = {
  loading: boolean;
};

const Loading: VFC<Props> = ({ loading }) => {
  return (
    <>
      {loading && (
        <div
          className='w-full h-full flex fixed top-0 left-0 justify-center items-center z-30'
          data-testid='spinner'
        >
          <section className='absolute z-50 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
            <ReactLoading
              type='spin'
              color='#000'
              height='300px'
              width='300px'
            />
          </section>
        </div>
      )}
    </>
  );
};

export default memo(Loading);
