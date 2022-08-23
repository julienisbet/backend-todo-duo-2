const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const mockUser = {
  firstName: 'Cinderella',
  lastName: 'Tremaine',
  email: 'ilostmyshoe@cinder.com',
  password: 'gussguss'
};



describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });


  it('Sign up form which hits POST /api/v1/users/, creates a new user and redirects to list of tasks', async () => {
    const res = await request(app).post('/api/v1/users/')
      .send(mockUser);
    const { firstName, lastName, email } = mockUser;

    expect(res.body).toEqual({

      id: expect.any(String),
      firstName,
      lastName,
      email,
    });
  });

  it('signs in an existing user, creates a cookie and redirects to list of tasks', async () => {
    await request(app).post('/api/v1/users').send(mockUser);
    const res = await request(app).post('/api/v1/users/sessions')
      .send({ email: 'ilostmyshoe@cinder.com', password: 'gussguss' });
    expect(res.status).toBe(200);

  });










  afterAll(() => {
    pool.end();
  });
});
