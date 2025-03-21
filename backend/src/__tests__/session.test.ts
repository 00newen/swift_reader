import request from 'supertest';
import { app, server } from '../server';

describe('Session API', () => {
  afterAll((done) => {
    server.close(done);
  });

  test('should create a session', async () => {
    const res = await request(app).post('/api/v1/sessions').send();
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('sessionCode');
  });
});
