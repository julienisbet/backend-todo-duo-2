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

const registerAndLogin = async (userProps = {}) => {
  userProps.password ?? mockUser.password;
  const agent = request.agent(app);
  const resp = await agent
    .post('/api/v1/users')
    .send({ ...mockUser, ...userProps });
  const user = resp.body;
  return [agent, user];
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

  it('POST /api/v1/users/me returns the authenticated user, Users should be redirected to list of tasks if already authenticated', async () => {
    const [agent, user] = await registerAndLogin();
    const resp = await agent.get('/api/v1/users/me');
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      ...user,
      exp: expect.any(Number),
      iat: expect.any(Number),
    });
  });

  it('deletes session', async () => {
    const [agent] = await registerAndLogin();
    const deleteResp = await agent.delete('/api/v1/users/sessions');
    expect(deleteResp.status).toBe(204);
    const res = await agent.get('/api/v1/users/me');
    expect(res.status).toBe(401);
  });

  it ('List of tasks calls GET /api/v1/todos/ and lists all todos for the authenticated user', async () => {
    const [agent] = await registerAndLogin();
    const res = await agent.get('api/v1/todos');
    expect(res.staus).toBe(200);
  });








  afterAll(() => {
    pool.end();
  });
});
