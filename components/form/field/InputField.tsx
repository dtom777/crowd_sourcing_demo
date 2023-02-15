import { VFC } from 'react';
import { FieldError } from 'react-hook-form';

import ErrorMessage from '@/components/elements/error/ErrorMessage';

type Props = Omit<JSX.IntrinsicElements['input'], 'ref'> & {
  label: string;
  errorMessage: string;
  errors?: FieldError;
  inputRef?: React.Ref<HTMLInputElement>;
};

const InputField: VFC<Props> = ({
  label,
  errorMessage,
  errors,
  inputRef,
  ...inputProps
}) => {
  return (
    <div className='form-control'>
      <label className='label'>
        <span className='label-text'>{label}</span>
      </label>
      <input className='input input-bordered' {...inputProps} ref={inputRef} />
      {errors && <ErrorMessage errorMessage={errorMessage} />}
    </div>
  );
};

export default InputField;
