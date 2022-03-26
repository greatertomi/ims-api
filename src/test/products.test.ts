import { assert, expect } from 'chai';
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
            assert.isArray(res.body, 'Response should be an array');
            return done();
          } catch (error) {
            return done(error);
          }
        });
    });
  });

  describe('GET /products/:id', () => {
    it('Fetches data when id is given', (done) => {
      factory.app
        .get('/products/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          try {
            const { locations } = res.body;
            if (err) throwError(err);
            assert.isObject(res.body, 'Response should be an object');
            assert.isArray(locations, 'Locations should be an array');
            return done();
          } catch (error) {
            return done(error);
          }
        });
    });

    it('Throw 404 error when id that does not exist is provided', (done) => {
      factory.app
        .get('/products/20')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
        .end((err, res) => {
          try {
            const { message } = res.body;
            if (err) throwError(err);
            expect(message).eq(
              'Product with this id does not exist',
              'Error message does not match'
            );
            return done();
          } catch (error) {
            return done(error);
          }
        });
    });
  });

  describe('PUT /products/:id', () => {
    const goodData = { location: 'A50', newQuantity: 3, action: 'add' };
    const wrongLocationData = {
      location: 'C50',
      newQuantity: 3,
      action: 'subtract'
    };
    const tooLargeQuantityData = {
      location: 'A50',
      newQuantity: 4000,
      action: 'subtract'
    };
    const missingData = { location: 'A50' };

    it('Update product quantity when proper value is given', (done) => {
      factory.app
        .put('/products/1')
        .send(goodData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          try {
            const { message, data } = res.body;
            if (err) throwError(err);
            assert.isObject(data, 'Data should be an object');
            expect(message).eq(
              'Product updated successfully',
              'Message does not match'
            );
            return done();
          } catch (error) {
            return done(error);
          }
        });
    });

    it('Throw 400 error for incomplete data', (done) => {
      factory.app
        .put('/products/1')
        .send(missingData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400, done);
    });

    it('Throw 404 error when wrong location is provided', (done) => {
      factory.app
        .put('/products/1')
        .send(wrongLocationData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
        .end((err, res) => {
          try {
            const { message } = res.body;
            if (err) throwError(err);
            expect(message).eq(
              'This product does not exist for this location',
              'Message does not match'
            );
            return done();
          } catch (error) {
            return done(error);
          }
        });
    });

    it('Throw 400 error when subtracting greater than available quantity', (done) => {
      factory.app
        .put('/products/1')
        .send(tooLargeQuantityData)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err, res) => {
          try {
            const { message } = res.body;
            if (err) throwError(err);
            expect(message).eq(
              'newQuantity too large',
              'Message does not match'
            );
            return done();
          } catch (error) {
            return done(error);
          }
        });
    });
  });
});
