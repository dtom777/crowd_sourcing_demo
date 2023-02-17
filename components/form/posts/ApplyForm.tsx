import { memo, VFC } from 'react';

import { useApplyPost } from '@/hooks/useApplyPost';

import TextareaField from '@/components/elements/field/TextareaField';

type Props = {
  post: { id: string };
};

const ApplyForm: VFC<Props> = ({ post }) => {
  const { loading, handleSubmit, fieldValues, errors } = useApplyPost(post);

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
        <div className='flex justify-center items-center'>
          <button className='btn btn-primary'>Send Message</button>
        </div>
      </form>
    </>
  );
};

export default memo(ApplyForm);
