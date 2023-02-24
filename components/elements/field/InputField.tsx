import { VFC } from 'react';

import ErrorMessage from '@/components/elements/error/ErrorMessage';

type Props = Omit<JSX.IntrinsicElements['input'], 'ref'> & {
  label: string;
  errors?: string[];
  inputRef?: React.Ref<HTMLInputElement>;
};

const InputField: VFC<Props> = ({ label, errors, inputRef, ...inputProps }) => {
  return (
    <div className='form-control'>
      <label className='label'>
        <span className='label-text'>{label}</span>
      </label>
      <input className='input-bordered input' {...inputProps} ref={inputRef} />
      {errors?.length &&
        errors?.map((err) => <ErrorMessage key={err} errorMessage={err} />)}
    </div>
  );
};

export default InputField;
