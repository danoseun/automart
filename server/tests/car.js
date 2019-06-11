import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

import { validCarData, invalidCarData } from './mockData/car';
import { users, cars } from '../dummyDb';

const { should, expect } = chai;
should();
chai.use(chaiHttp);
let userClaim;
let adminToken;
let ownerClaim;

describe('Create token for user', () => {
  it('Should create token after successful login', async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'iknagod@gmail.com',
        password: 'jamespass'
      });
    expect(res).to.have.status(200);
    userClaim = res.body.data.token;
  });

  it('Should create token for admin after successful login', async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'tayoka@gmail.com',
        password: 'tayoabdulabc'
      });
    expect(res).to.have.status(200);
    adminToken = res.body.data.token;
  });

  it('Should create token for owner after successful login', async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'pecky@gmail.com',
        password: 'peckkesh123'
      });
    expect(res).to.have.status(200);
    ownerClaim = res.body.data.token;
  });
});


describe('Test for Cars routes', () => {
  describe('Test for postAd route', () => {
    it('should return 201 status and post ad', async () => {
      const newLength = cars.length + 1;
      const res = await chai.request(app)
        .post('/api/v1/car')
        .set('authorization', userClaim)
        .send(validCarData[0]);
      res.should.have.status(201);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal(201);
      expect(res.body.data).to.be.a('object');
      expect(cars).to.have.length(newLength);
    });
    it('should return 201 status and post ad', async () => {
      const newLength = cars.length + 1;
      const res = await chai.request(app)
        .post('/api/v1/car')
        .set('authorization', userClaim)
        .send(validCarData[1]);
      res.should.have.status(201);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal(201);
      expect(res.body.data).to.be.a('object');
      expect(cars).to.have.length(newLength);
    });
    // state
    it('should return 400 status code and not post ad', async () => {
      const res = await chai.request(app)
        .post('/api/v1/car')
        .set('authorization', userClaim)
        .send(invalidCarData[0]);
      res.should.have.status(400);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal(400);
      expect(res.body.errors).to.be.a('object');
    });

    it('should return 400 status code and not post ad', async () => {
      const res = await chai.request(app)
        .post('/api/v1/car')
        .set('authorization', userClaim)
        .send(invalidCarData[1]);
      res.should.have.status(400);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal(400);
      expect(res.body.errors).to.be.a('object');
    });
    // price
    it('should return 400 status code and not post ad', async () => {
      const res = await chai.request(app)
        .post('/api/v1/car')
        .set('authorization', userClaim)
        .send(invalidCarData[2]);
      res.should.have.status(400);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal(400);
      expect(res.body.errors).to.be.a('object');
    });
    it('should return 400 status code and not post ad', async () => {
      const res = await chai.request(app)
        .post('/api/v1/car')
        .set('authorization', userClaim)
        .send(invalidCarData[3]);
      res.should.have.status(400);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal(400);
      expect(res.body.errors).to.be.a('object');
    });
    // manufacturer
    it('should return 400 status code and not post ad', async () => {
      const res = await chai.request(app)
        .post('/api/v1/car')
        .set('authorization', userClaim)
        .send(invalidCarData[4]);
      res.should.have.status(400);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal(400);
      expect(res.body.errors).to.be.a('object');
    });
    it('should return 400 status code and not post ad', async () => {
      const res = await chai.request(app)
        .post('/api/v1/car')
        .set('authorization', userClaim)
        .send(invalidCarData[5]);
      res.should.have.status(400);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal(400);
      expect(res.body.errors).to.be.a('object');
    });
    // model
    it('should return 400 status code and not post ad', async () => {
      const res = await chai.request(app)
        .post('/api/v1/car')
        .set('authorization', userClaim)
        .send(invalidCarData[6]);
      res.should.have.status(400);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal(400);
      expect(res.body.errors).to.be.a('object');
    });
    it('should return 400 status code and not post ad', async () => {
      const res = await chai.request(app)
        .post('/api/v1/car')
        .set('authorization', userClaim)
        .send(invalidCarData[7]);
      res.should.have.status(400);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal(400);
      expect(res.body.errors).to.be.a('object');
    });
    // bodytype
    it('should return 400 status code and not post ad', async () => {
      const res = await chai.request(app)
        .post('/api/v1/car')
        .set('authorization', userClaim)
        .send(invalidCarData[8]);
      res.should.have.status(400);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal(400);
      expect(res.body.errors).to.be.a('object');
    });
    it('should return 400 status code and not post ad', async () => {
      const res = await chai.request(app)
        .post('/api/v1/car')
        .set('authorization', userClaim)
        .send(invalidCarData[9]);
      res.should.have.status(400);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal(400);
      expect(res.body.errors).to.be.a('object');
    });
    // imageurl
    it('should return 400 status code and not post ad', async () => {
      const res = await chai.request(app)
        .post('/api/v1/car')
        .set('authorization', userClaim)
        .send(invalidCarData[10]);
      res.should.have.status(400);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal(400);
      expect(res.body.errors).to.be.a('object');
    });
  });

  describe('Test for getAdRoutes', () => {
    it('Should return 200 status code and serve a single Ad', async () => {
      const res = await chai.request(app)
        .get('/api/v1/car/1');
      res.should.have.status(200);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal(200);
      expect(res.body.data).to.be.a('object');
    });

    it('Should return 404 status code and not serve a single Ad', async () => {
      const res = await chai.request(app)
        .get('/api/v1/car/qui');
      res.should.have.status(404);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal(404);
      expect(res.body.error).to.equal('Car not found');
    });
  });
});
