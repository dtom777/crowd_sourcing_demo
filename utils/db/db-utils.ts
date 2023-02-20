/* eslint-disable no-param-reassign */
import { promises as fs } from 'fs';
import path from 'path';

import { UserWithPost } from '@/types/user.type';

import type { PostWithUserAndCategory } from '@/types/post.type';

export const getDbPath = (): string => {
  if (!process.env.DB_PATH) {
    throw new Error('Missing process.env.DB_PATH');
  }

  return process.env.DB_PATH;
};

type JsonDataType = PostWithUserAndCategory | UserWithPost;

export enum filenames {
  posts = 'posts.json',
  users = 'users.json',
}

const defaultDbPath = getDbPath();

export async function getJSONfromFile<ItemType extends JsonDataType>(
  filename: filenames,
  dbPath: string = defaultDbPath
): Promise<ItemType[]> {
  const filePath = path.join(dbPath, filename);
  const data = await fs.readFile(filePath);

  return JSON.parse(data.toString());
}
