import { assert } from 'chai';
import { throwError } from '../utils/helpers';
import { TestFactory } from './factory';

describe('Testing the product routes', () => {
  const factory: TestFactory = new TestFactory();

  before((done) => {
    factory.init().then(done);
  });

  after((done) => {
    factory.close().then(done);
  });

  describe('GET /locations/:productId', () => {
    it('Fetches all products for a location', (done) => {
      factory.app
        .get('/locations/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          try {
            if (err) throwError(err);
            assert.isArray(res.body, 'Response should be an array');
            return done();
          } catch (error) {
            return done(error);
          }
        });
    });
  });
});
