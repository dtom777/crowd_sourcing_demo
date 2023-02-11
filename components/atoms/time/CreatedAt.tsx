import { memo, VFC } from 'react';

type Props = {
  title?: string;
  createdAt?: Date;
  className?: string;
};

const CreatedAt: VFC<Props> = ({ title, createdAt, className }) => {
  return (
    <div className={`text-gray-500 ${className}`}>
      {title}
      {new Date(createdAt).toLocaleDateString('ja-JP')}
    </div>
  );
};

export default memo(CreatedAt);
