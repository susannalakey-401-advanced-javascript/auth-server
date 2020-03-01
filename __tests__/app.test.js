const supergoose = require('@code-fellows/supergoose');
const { server } = require('../app');

jest.mock('../middleware/errorHandler')

describe('the server', () => {
  let mockRequest;

  beforeEach(() => {
    mockRequest = supergoose(server);
  })

  describe('error handlers', () => {

    it('handles a 404 error', async () => {
      return mockRequest
        .get('/fakeroute')
        .then(results => {
          expect(results.status).toBe(404);
        })
    })
  })

  describe('routes', () => {


  })
  it('can list all entries in the database', () => {
    return mockRequest.get('/users')
      .send()
      .then(results => {
        expect(results.status).toBe(200);
      })
  })

  it('adds a new user to the database when making a POST request to /signup', () => {
    const newSignup = {
      username: 'banana',
      password: '123',
      role: 'admin',
    }

    return mockRequest
      .post('/signup')
      .send(newSignup)
      .then(result => {
        // console.log('result.body', result)
        expect(result.status).toBe(201);
      })
  })

  it('denies a user signup if they are already in the databse', async () => {
    const newSignup = {
      username: 'donald',
      password: '123',
      role: 'admin',
    }
    await mockRequest
      .post('/signup')
      .send(newSignup)
    return mockRequest
      .post('/signup')
      .send(newSignup)
      .then(results => {
        expect(results.status).toBe(500);
      });

  })

  it('allows a user to signin if they are already in the database', async () => {
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
      .set('Authorization', `${newSignup.username}:${newSignup.password}`)
      // .send(newSignup)
      .then(results => {
        expect(results.status).toBe(200);
      });
  })

})

