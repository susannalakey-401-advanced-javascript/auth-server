const supergoose = require('@code-fellows/supergoose');
const { server } = require('../app');

describe('bearer-auth', () => {

  let mockRequest;

  beforeEach(() => {
    mockRequest = supergoose(server);
  })
  it('returns an error if no authorization headers are found', async () => {

    const newSignup = {
      username: 'donald',
      password: '123',
      role: 'admin',
    }
    await mockRequest
      .post('/signup')
      .send(newSignup)
    return mockRequest
      .post('/signin')
      .send(newSignup)
      .then(results => {
        expect(results).toThrow();
      });
  })

  it('authenticates a users token', async () => {

    const newSignup = {
      username: 'donald',
      password: '123',
      role: 'admin',
    }
    await mockRequest
      .post('/signup')
      .send(newSignup)
    return mockRequest
      .post('/signin')
      .send(newSignup)
      .then(results => {
        expect(results.status).toBe(200);
      });
  })