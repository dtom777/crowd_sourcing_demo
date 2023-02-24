import { VFC } from 'react';

import ErrorMessage from '@/components/elements/error/ErrorMessage';

type Props = Omit<JSX.IntrinsicElements['textarea'], 'ref'> & {
  label: string;
  errors?: string[];
  inputRef?: React.Ref<HTMLTextAreaElement>;
};

const TextareaField: VFC<Props> = ({
  label,
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
      {errors?.length &&
        errors?.map((err) => <ErrorMessage key={err} errorMessage={err} />)}
    </div>
  );
};

export default TextareaField;
