import { ReactNode, FC } from 'react';
import { FieldError } from 'react-hook-form';

import ErrorMessage from '@/components/elements/error/ErrorMessage';

type Props = Omit<JSX.IntrinsicElements['select'], 'ref'> & {
  label: string;
  errorMessage: string;
  errors?: FieldError;
  inputRef?: React.Ref<HTMLSelectElement>;
  children: ReactNode;
};

const SelectField: FC<Props> = ({
  label,
  errorMessage,
  errors,
  inputRef,
  children,
  ...inputProps
}) => {
  return (
    <div className='form-control'>
      <label className='label'>
        <span className='label-text'>{label}</span>
      </label>
      <select
        className='select select-bordered w-full max-w-xs'
        {...inputProps}
        ref={inputRef}
      >
        {children}
      </select>
      {errors && <ErrorMessage errorMessage={errorMessage} />}
    </div>
  );
};

export default SelectField;
