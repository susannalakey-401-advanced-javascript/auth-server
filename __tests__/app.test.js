const supergoose = require('@code-fellows/supergoose');
const { server } = require('../app');

// tests all routes
// test error handlers


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
    it('can list all entries in the database', () => {

    })

    it('adds a new user to the database when making a POST request to /signup', () => {

    })

    it('denies a user signup if they are already in the databse', () => {

    })

    it('allows a user to signin if they are already in the databse', () => {

    })


  })

})