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

describe('GET /user', () => {
  it('should answer with status 200 when user is returned', async () => {
    const user = await createUser();

    const response = await supertest(app).get(`/user/${user.id}`);

    expect(response.status).toBe(200);
  });

  it('should answer with status 404 when user doesnt exists', async () => {
    const response = await supertest(app).get('/user/1');

    expect(response.status).toBe(404);
  });
});
