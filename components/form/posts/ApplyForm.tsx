import { memo, VFC } from 'react';

import { useApplyPost } from '@/hooks/useApplyPost';

import SubmitButton from '@/components/elements/button/SubmitButton';
import TextareaField from '@/components/elements/field/TextareaField';

type Props = {
  post: { id: string };
};

const ApplyForm: VFC<Props> = ({ post }) => {
  const { handleSubmit, fieldValues, errors } = useApplyPost(post);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col px-8 pb-8 bg-white rounded'
      >
        <div className='mb-4'>
          <TextareaField
            {...fieldValues.message}
            label='Message'
            errorMessage='Please enter between 1 to 1000 characters.'
            errors={errors.message}
            placeholder='message'
            rows={6}
          />
        </div>

        <SubmitButton
          className='items-center mt-2'
          color='primary'
          value='Send Message'
        />
      </form>
    </>
  );
};

export default memo(ApplyForm);
