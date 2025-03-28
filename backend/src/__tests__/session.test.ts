import request from 'supertest';
import { app, server } from '../server.js';
import { generateSessionCode } from '../utils/generateSessionCode.js';

describe('Session API', () => {
  afterAll((done) => {
    server.close(done);
  });

  test('should create a session', async () => {
    const res = await request(app).get('/api/v1/session').send();
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('code');
    expect(res.body.code).toHaveLength(8);
  });

  test.todo('should fetch a session');
  test.todo('should add a participant to a session');
  test.todo('should remove a participant from a session');
  test.todo('should delete a session');
  test.todo('should update a participant name and theme setting');
});
