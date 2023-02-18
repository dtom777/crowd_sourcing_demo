import { VFC } from 'react';
import { FieldError } from 'react-hook-form';

import ErrorMessage from '@/components/elements/error/ErrorMessage';

type Props = Omit<JSX.IntrinsicElements['textarea'], 'ref'> & {
  label: string;
  errorMessage: string;
  errors?: FieldError;
  inputRef?: React.Ref<HTMLTextAreaElement>;
};

const TextareaField: VFC<Props> = ({
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
      <textarea
        className='textarea-bordered textarea'
        {...inputProps}
        ref={inputRef}
      />
      {errors && <ErrorMessage errorMessage={errorMessage} />}
    </div>
  );
};

export default TextareaField;
