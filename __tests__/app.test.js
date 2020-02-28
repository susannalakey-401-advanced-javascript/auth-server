const supergoose = require('@code-fellows/supergoose');
const { server } = require('../app');

describe('the server', () => {
  let mockRequest;

  beforeEach(() => {
    mockRequest = supergoose(server);
  })

  describe('error handlers', () => {

    it('handles a 404 error', () => {
      return mockRequest
        .get('/fakeroute')
        .then(results => {
          expect(results.status).toBe(404);
        })
    })
  })

  describe('routes', () => {
    let newSignup;

    beforeEach(() => {
      newSignup = {
        username: 'banana',
        password: '123',
        role: 'user',
      }

    })
    it('can list all entries in the database', () => {
      return mockRequest.get('/users')
        .send()
        .then(results => {
          expect(results.status).toBe(200);
        })
    })

    it('adds a new user to the database when making a POST request to /signup', () => {


      return mockRequest
        .post('/signup')
        .send(newSignup)
        .then(result => {
          console.log('result.body', result)
          expect(result.status).toBe(201);
        })
    })

    it('denies a user signup if they are already in the databse', async () => {
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

    // it('allows a user to signin if they are already in the database', () => {
    //   return mockRequest
    //     .post('/signin')
    //     .send(newSignup)
    //     .then(results => {
    //       expect(results.status).toBe(500);
    //     });
    // })


  })

})