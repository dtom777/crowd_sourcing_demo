import path from 'path';

import { PostWithUserAndCategory } from '@/types/post.type';
import { UserWithProfile } from '@/types/user.type';
import { filenames, getJSONfromFile } from '@/utils/db/db-utils';

const JSON_FILEPATH = path.join(__dirname, 'json');

export const readFakeData = async () => {
  const [fakePosts, fakeUsers] = await Promise.all([
    getJSONfromFile(filenames.posts, JSON_FILEPATH),
    getJSONfromFile(filenames.users, JSON_FILEPATH),
  ]);

  return {
    fakePosts: fakePosts as Array<PostWithUserAndCategory>,
    fakeUsers: fakeUsers as Array<UserWithProfile>,
  };
};
