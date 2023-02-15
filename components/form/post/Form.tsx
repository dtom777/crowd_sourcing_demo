import { Post } from '@prisma/client';
import { Session } from 'next-auth';
import { VFC } from 'react';

import { usePost } from '@/hooks/useUpsertPost';

import Spinner from '@/components/elements/spinner/Spinner';

import InputField from '../field/InputField';
import SelectField from '../field/SelectField';
import TextareaField from '../field/TextareaField';

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

      <form className='hero min-h-screen' onSubmit={handleSubmit}>
        <div className='hero-content flex-col'>
          <div className='text-center'>
            <h1 className='text-5xl font-bold'>{type} POST</h1>
          </div>
          <div className='card flex-shrink-0 shadow-2xl bg-base-100 md:max-w-screen-md md:w-screen w-full'>
            <div className='card-body'>
              <InputField
                {...fieldValues.title}
                errorMessage='Please enter'
                errors={errors.title}
                label='Title'
                type='text'
                placeholder='title'
                defaultValue={post?.title}
              />
              <TextareaField
                {...fieldValues.content}
                errorMessage='Please enter 1 to 255 characters.'
                errors={errors.content}
                label='Description'
                placeholder='Description'
                rows={6}
                defaultValue={post?.content}
              />
              <SelectField
                {...fieldValues.categorySlug}
                errorMessage='Please select'
                errors={errors.categorySlug}
                label='Category'
                defaultValue={post?.categorySlug}
              />
              <InputField
                {...fieldValues.reward}
                errorMessage='Please enter'
                errors={errors.reward}
                label='Reward - USD'
                type='number'
                placeholder='0'
                defaultValue={post?.reward}
              />
              <div className='form-control mt-6'>
                <input type='submit' className='btn btn-primary' value={type} />
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default PostForm;
