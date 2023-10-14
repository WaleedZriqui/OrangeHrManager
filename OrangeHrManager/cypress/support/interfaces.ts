import { faker } from '@faker-js/faker';

export interface CreateUserPayload {
  user: {
    username: string;
    email: string;
    password: string;
  };
}

export const createUserPayload: CreateUserPayload = {

  user: {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: '232fa',
  },
};