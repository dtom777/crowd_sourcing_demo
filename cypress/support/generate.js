import { build, fake } from '@jackfranklin/test-data-bot';

export const createUser = build('User', {
  fields: {
    name: fake((f) => f.internet.userName()),
    password: fake((f) => f.internet.password()),
    email: 'test@test.com',
  },
});
