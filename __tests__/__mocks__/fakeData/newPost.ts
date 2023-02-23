import { PostWithUserAndCategory } from '@/types/post.type';

export const generateNewPost = (postId: string): PostWithUserAndCategory => ({
  id: postId,
  title: 'Software Engineer Node',
  content:
    "Our web apps run on Node's Nestjs framework, so you will spent most of your time Writing in Node",
  reward: 1000,
  published: true,
  draft: false,
  userId: '8de0f61b-aece-4165-8c38-971e209fed1b',
  createdAt: new Date('2023-02-19T12:46:33.472Z'),
  updatedAt: new Date('2023-02-19T12:46:33.478Z'),
  user: {
    id: '8de0f61b-aece-4165-8c38-971e209fed1b',
    name: 'testUser',
    email: 'test@test.com',
    password: '$2a$10$vA6ITmaU5tUBOvl6cP5nHuFJ8hXwWRQ9WzBp9x3PuOk5uJ274w6C.',
    image: '/avatar-2.jpg',
    role: 'USER',
    active: true,
    resetToken: null,
    resetTokenExpiration: null,
    createdAt: new Date('2023-02-19T12:46:33.472Z'),
    updatedAt: new Date('2023-02-19T12:46:33.478Z'),
  },
  categorySlug: 'music',
  category: {
    id: '011f1c70-c91d-4c9e-a899-089646109e72',
    name: '音楽',
    slug: 'music',
    createdAt: new Date('2023-02-19T12:46:33.472Z'),
    updatedAt: new Date('2023-02-19T12:46:33.478Z'),
  },
});
