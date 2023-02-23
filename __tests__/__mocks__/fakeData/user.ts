import { Session } from 'next-auth';

export const mockUser = {
  id: '1383bc13-b9fc-9337-1054-3b62b69da306',
  name: 'testUser',
  email: 'test@test.com',
  password: '$2a$10$vA6ITmaU5tUBOvl6cP5nHuFJ8hXwWRQ9WzBp9x3PuOk5uJ274w6C.',
  image: '/avatar-2.jpg',
  role: 'USER',
  active: 'true',
  profile: {
    id: 'b9e67ce4-ed41-6b23-b786-02796b986c43',
    bi0: "Hello! I'm test user.",
    userId: '1383bc13-b9fc-9337-1054-3b62b69da306',
  },
};

export const mockSession: Session = {
  ok: true,
  expires: '2023-03-22T12:49:47.671Z',
  user: { name: mockUser.name, email: mockUser.email, image: mockUser.image },
};
