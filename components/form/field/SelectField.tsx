import { VFC } from 'react';
import { FieldError } from 'react-hook-form';

import ErrorMessage from '@/components/elements/error/ErrorMessage';

import { categories } from '@/constants/category';

type Props = Omit<JSX.IntrinsicElements['select'], 'ref'> & {
  label: string;
  errorMessage: string;
  errors?: FieldError;
  inputRef?: React.Ref<HTMLSelectElement>;
};

const SelectField: VFC<Props> = ({
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
      <select
        className='select select-bordered w-full max-w-xs'
        {...inputProps}
        ref={inputRef}
      >
        <option value=''>Please Select</option>
        {categories.map(({ slug }) => {
          if (slug === 'new arrivals') return;

          return (
            <option key={slug} value={slug}>
              {slug}
            </option>
          );
        })}
      </select>
      {errors && <ErrorMessage errorMessage={errorMessage} />}
    </div>
  );
};

export default SelectField;
