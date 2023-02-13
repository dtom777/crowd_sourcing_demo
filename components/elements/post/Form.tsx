import { Session } from 'next-auth';
import { useForm } from 'react-hook-form';
import Loading from '@/components/atoms/loading/Loading';
import ErrorMessage from '@/components/atoms/error/ErrorMessage';
import { categories } from 'constants/category';
import { useUpsertPost } from '@/hooks/useCreatePost';
import { VFC } from 'react';
import { Post } from '@prisma/client';

type Props = {
  session: Session;
  type: 'CREATE' | 'UPDATE';
  post?: Post;
};

const PostForm: VFC<Props> = ({ session, type, post }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loading, upsertPost } = useUpsertPost({ session, type, post });

  return (
    <>
      <Loading loading={loading} />

      <form className='hero min-h-screen' onSubmit={handleSubmit(upsertPost)}>
        <div className='hero-content flex-col'>
          <div className='text-center'>
            <h1 className='text-5xl font-bold'>{type} POST</h1>
          </div>
          <div className='card flex-shrink-0 shadow-2xl bg-base-100 md:max-w-screen-md md:w-screen w-full'>
            <div className='card-body'>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Title</span>
                </label>
                <input
                  {...register('title', {
                    required: true,
                  })}
                  type='text'
                  placeholder='title'
                  className='input input-bordered'
                  defaultValue={post?.title}
                />
                {errors.title && <ErrorMessage errorMessage='Please enter' />}
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Description</span>
                </label>
                <textarea
                  className='textarea textarea-bordered'
                  placeholder='Description'
                  rows={6}
                  {...register('content', {
                    required: true,
                    maxLength: 255,
                  })}
                  defaultValue={post?.content}
                />
                {errors.content && (
                  <ErrorMessage errorMessage='Please enter 1 to 255 characters.' />
                )}
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Category</span>
                </label>
                <select
                  {...register('categorySlug', {
                    required: true,
                  })}
                  className='select select-bordered w-full max-w-xs'
                  defaultValue={post?.categorySlug}
                >
                  <option value={''}>Please Select</option>
                  {categories.map(({ slug }) => {
                    if (slug === 'new arrivals') return;

                    return (
                      <option key={slug} value={slug}>
                        {slug}
                      </option>
                    );
                  })}
                </select>
                {errors.categorySlug && (
                  <ErrorMessage errorMessage='Please select' />
                )}
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Reward - USD</span>
                </label>
                <input
                  {...register('reward', { required: true })}
                  type='number'
                  placeholder='0'
                  className='input input-bordered'
                  defaultValue={post?.reward}
                />
                {errors.reward && <ErrorMessage errorMessage='Please enter' />}
              </div>
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
