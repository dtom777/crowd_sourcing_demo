import { VFC } from 'react';

import { useAppSelector } from '@/stores/hooks';
import { selectIsLoading } from '@/stores/loading-slice';

type Props = {
  className: string;
  color: string;
  value: string;
};

const SubmitButton: VFC<Props> = ({ className, color, value }) => {
  const isLoading = useAppSelector(selectIsLoading);

  return (
    <div className={`form-control ${className}`}>
      <button
        className={`btn btn-${color} ${isLoading && 'loading'}`}
        disabled={isLoading}
        type='submit'
      >
        {value}
      </button>
    </div>
  );
};

export default SubmitButton;
