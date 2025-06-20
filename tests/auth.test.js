const request = require('supertest');
const app = require('../server');

describe('POST /api/auth/register', () => {
  it('sollte einen neuen Nutzer registrieren', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: 'password123' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
  });
});