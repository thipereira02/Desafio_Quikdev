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

describe('GET /user/:id', () => {
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

describe('POST /user', () => {
  it('should answer with status 201 when user is created', async () => {
    const body = {
      name: 'Teste',
      username: 'teste1234',
      birthdate: '10/10/10',
      address: 'Rua do Pássaro',
      addressNumber: '10A',
      primaryPhone: '1012345678',
      description: 'A very experient user',
    };

    const response = await supertest(app).post('/user').send(body);

    expect(response.status).toBe(201);
  });

  it('should answer with status 400 when name is empty', async () => {
    const body = {
      name: '',
      username: 'teste1234',
      birthdate: '10/10/10',
      address: 'Rua do Pássaro',
      addressNumber: '10A',
      primaryPhone: '1012345678',
      description: 'A very experient user',
    };

    const response = await supertest(app).post('/user').send(body);

    expect(response.status).toBe(400);
  });

  it('should answer with status 400 when username is empty', async () => {
    const body = {
      name: 'Teste',
      username: '',
      birthdate: '10/10/10',
      address: 'Rua do Pássaro',
      addressNumber: '10A',
      primaryPhone: '1012345678',
      description: 'A very experient user',
    };

    const response = await supertest(app).post('/user').send(body);

    expect(response.status).toBe(400);
  });

  it('should answer with status 400 when username already in use', async () => {
    await createUser();

    const body = {
      name: 'Teste',
      username: 'teste123',
      birthdate: '10/10/10',
      address: 'Rua do Pássaro',
      addressNumber: '10A',
      primaryPhone: '1012345678',
      description: 'A very experient user',
    };

    const response = await supertest(app).post('/user').send(body);

    expect(response.status).toBe(409);
  });

  it('should answer with status 400 when birthdate is not a valid date', async () => {
    const body = {
      name: 'Teste',
      username: 'teste1234',
      birthdate: '10/1010',
      address: 'Rua do Pássaro',
      addressNumber: '10A',
      primaryPhone: '1012345678',
      description: 'A very experient user',
    };

    const response = await supertest(app).post('/user').send(body);

    expect(response.status).toBe(400);
  });

  it('should answer with status 400 when birthdate is empty', async () => {
    const body = {
      name: 'Teste',
      username: 'teste1234',
      birthdate: '',
      address: 'Rua do Pássaro',
      addressNumber: '10A',
      primaryPhone: '1012345678',
      description: 'A very experient user',
    };

    const response = await supertest(app).post('/user').send(body);

    expect(response.status).toBe(400);
  });

  it('should answer with status 400 when address is empty', async () => {
    const body = {
      name: 'Teste',
      username: 'teste1234',
      birthdate: '10/10/10',
      address: '',
      addressNumber: '10A',
      primaryPhone: '1012345678',
      description: 'A very experient user',
    };

    const response = await supertest(app).post('/user').send(body);

    expect(response.status).toBe(400);
  });

  it('should answer with status 400 when addressNumber is empty', async () => {
    const body = {
      name: 'Teste',
      username: 'teste1234',
      birthdate: '10/10/10',
      address: 'Rua do Pássaro',
      addressNumber: '',
      primaryPhone: '1012345678',
      description: 'A very experient user',
    };

    const response = await supertest(app).post('/user').send(body);

    expect(response.status).toBe(400);
  });

  it('should answer with status 400 when primaryPhone is invalid', async () => {
    const body = {
      name: 'Teste',
      username: 'teste1234',
      birthdate: '10/10/10',
      address: 'Rua do Pássaro',
      addressNumber: '10A',
      primaryPhone: '10ssds5678',
      description: 'A very experient user',
    };

    const response = await supertest(app).post('/user').send(body);

    expect(response.status).toBe(400);
  });

  it('should answer with status 400 when primaryPhone has more than 10 caracteres', async () => {
    const body = {
      name: 'Teste',
      username: 'teste1234',
      birthdate: '10/10/10',
      address: 'Rua do Pássaro',
      addressNumber: '10A',
      primaryPhone: '10123456781',
      description: 'A very experient user',
    };

    const response = await supertest(app).post('/user').send(body);

    expect(response.status).toBe(400);
  });

  it('should answer with status 400 when primaryPhone is empty', async () => {
    const body = {
      name: 'Teste',
      username: 'teste1234',
      birthdate: '10/10/10',
      address: 'Rua do Pássaro',
      addressNumber: '10A',
      primaryPhone: '',
      description: 'A very experient user',
    };

    const response = await supertest(app).post('/user').send(body);

    expect(response.status).toBe(400);
  });

  it('should answer with status 400 when description is empty', async () => {
    const body = {
      name: 'Teste',
      username: 'teste1234',
      birthdate: '10/10/10',
      address: 'Rua do Pássaro',
      addressNumber: '10A',
      primaryPhone: '1012345678',
      description: '',
    };

    const response = await supertest(app).post('/user').send(body);

    expect(response.status).toBe(400);
  });
});

describe('DELETE /user/:id', () => {
  it('should answer with status 200 when user is returned', async () => {
    const user = await createUser();

    const response = await supertest(app).delete(`/user/${user.id}`);

    expect(response.status).toBe(200);
  });

  it('should answer with status 404 when user doesnt exists', async () => {
    const response = await supertest(app).delete('/user/1');

    expect(response.status).toBe(404);
  });
});
