/* eslint-disable no-undef */
import supertest from 'supertest';
import { getConnection } from 'typeorm';

import app, { init } from '../../src/app';
import { createUser } from '../factories/userFactory';
import { clearDatabase } from '../utils/database';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await getConnection().close();
});

describe('POST /login', () => {
  it('should answer with status 404 when user doesnt exists', async () => {
    const body = {
      email: 'teste@123.com',
      password: '123456',
    };

    const response = await supertest(app).post('/login').send(body);

    expect(response.status).toBe(404);
  });

  it('should answer with status 400 when body is invalid', async () => {
    const body = {
      email: 'teste',
      password: '123456',
    };

    const response = await supertest(app).post('/login').send(body);

    expect(response.status).toBe(400);
  });
});
