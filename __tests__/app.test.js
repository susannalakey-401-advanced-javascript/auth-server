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

  })

})