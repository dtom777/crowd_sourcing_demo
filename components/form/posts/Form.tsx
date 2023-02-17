import { Post } from '@prisma/client';
import { Session } from 'next-auth';
import { VFC } from 'react';

import { usePost } from '@/hooks/usePost';

import InputField from '@/components/elements/field/InputField';
import SelectField from '@/components/elements/field/SelectField';
import TextareaField from '@/components/elements/field/TextareaField';
import Spinner from '@/components/elements/spinner/Spinner';
import FormWrapper from '@/components/form/common/Wrapper';

import { categories } from '@/constants/category';

type Props = {
  session: Session;
  type: 'CREATE' | 'UPDATE';
  post?: Post;
};

const PostForm: VFC<Props> = ({ session, type, post }) => {
  const { loading, handleSubmit, fieldValues, errors } = usePost({
    session,
    type,
    post,
  });

  return (
    <>
      <Spinner loading={loading} />

      <FormWrapper title={`${type} POST`}>
        <form className='card-body' onSubmit={handleSubmit}>
          <InputField
            {...fieldValues.title}
            errorMessage='Please enter'
            errors={errors.title}
            label='Title'
            type='text'
            placeholder='title'
          />
          <TextareaField
            {...fieldValues.content}
            errorMessage='Please enter 1 to 255 characters.'
            errors={errors.content}
            label='Description'
            placeholder='Description'
            rows={6}
          />
          <SelectField
            {...fieldValues.categorySlug}
            errorMessage='Please select'
            errors={errors.categorySlug}
            label='Category'
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
          </SelectField>
          <InputField
            {...fieldValues.reward}
            errorMessage='Please enter'
            errors={errors.reward}
            label='Reward - USD'
            type='number'
            placeholder='0'
          />
          <div className='form-control mt-6'>
            <input type='submit' className='btn btn-primary' value={type} />
          </div>
        </form>
      </FormWrapper>
    </>
  );
};

export default PostForm;
