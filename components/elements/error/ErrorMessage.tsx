import { memo, VFC } from 'react';

type Props = {
  errorMessage?: string;
  className?: string;
  testId?: string;
};

const ErrorMessage: VFC<Props> = ({ errorMessage, className, testId }) => {
  return (
    <p className={`text-red-600 ${className}`} data-testid={testId}>
      {errorMessage}
    </p>
  );
};

export default memo(ErrorMessage);
