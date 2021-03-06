import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

import { validOrderData, invalidOrderData } from './mockData/order';
// import { orders } from '../dummyDb';

const { should, expect } = chai;
should();
chai.use(chaiHttp);

let userClaim;


describe('Create token for user', () => {
  it('Should create token after successful login', async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'iknagod@gmail.com',
        password: 'jamespass'
      });
    expect(res).to.have.status(200);
    userClaim = res.body.data.token;
  });
});


describe('Test for Orders routes', () => {
  describe('Test for postOrder route', () => {
    it('Should return 201 status code and post order', async () => {
      const res = await chai.request(app)
        .post('/api/v1/order')
        .set('authorization', userClaim)
        .send(validOrderData[0]);
      res.should.have.status(201);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal(201);
      expect(res.body.data).to.be.a('object');
    });
    it('Should return 400 status code and not post order', async () => {
      const res = await chai.request(app)
        .post('/api/v1/order')
        .set('authorization', userClaim)
        .send(invalidOrderData[0]);
      res.should.have.status(400);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal(400);
      expect(res.body.errors).to.be.a('object');
    });
    it('Should return 400 status code and not post order', async () => {
      const res = await chai.request(app)
        .post('/api/v1/order')
        .set('authorization', userClaim)
        .send(invalidOrderData[1]);
      res.should.have.status(400);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal(400);
      expect(res.body.errors).to.be.a('object');
    });
  });
});
