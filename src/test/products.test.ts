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

  describe('GET /products', () => {
    it('Fetches all products', (done) => {
      factory.app
        .get('/products')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          try {
            if (err) throwError(err);
            assert.isArray(res, 'Response should be an array');
            return done();
          } catch (error) {
            return done(error);
          }
        });
    });
  });
});
