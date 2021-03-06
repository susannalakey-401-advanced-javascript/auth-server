const supergoose = require('@code-fellows/supergoose');
const { server } = require('../app');



describe('basic-auth', () => {

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

  it('authorizes a user for signin with valid credentials', async () => {

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
})