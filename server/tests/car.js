import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../app';
import pool from '../config/config';

import { validCarData, invalidCarData } from './mockData/car';
// import { cars } from '../dummyDb';

const { should, expect } = chai;
should();
chai.use(chaiHttp);
let userClaim;
let adminToken;
let ownerClaim;

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
    console.log('A', userClaim);
  });


  it('Should create token for admin after successful login', async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'admin@gmail.com',
        password: 'password'
      });
    expect(res).to.have.status(200);
    adminToken = res.body.data.token;
    console.log('A', adminToken);
  });

  it('Should create token for owner after successful login', async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'processenv@gmail.com',
        password: 'jamespass'
      });
    expect(res).to.have.status(200);
    ownerClaim = res.body.data.token;
    console.log('A', ownerClaim);
  });
});


describe('Test for Cars routes', () => {
  describe('Test for postAd route', () => {
    it('should return 201 status and post ad', async () => {
      const res = await chai.request(app)
        .post('/api/v1/car')
        .set('authorization', userClaim)
        .send(validCarData[0]);
      res.should.have.status(201);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal(201);
      expect(res.body.data).to.be.a('object');
    });
    it('should return 201 status and post ad', async () => {
      const res = await chai.request(app)
        .post('/api/v1/car')
        .set('authorization', userClaim)
        .send(validCarData[1]);
      res.should.have.status(201);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal(201);
      expect(res.body.data).to.be.a('object');
    });

    // stub
    it('It should return internal server error for a connection error to the database { Status 500 } ', async () => {
      const stub = sinon.stub(pool, 'query').callsFake(() => Promise.reject());
      const res = await chai.request(app)
        .post('/api/v1/car')
        .set('authorization', userClaim)
        .send(validCarData[0]);
      expect(res.status).to.equal(500);
      stub.restore();
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
    // img_url
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
        .get('/api/v1/car/300');
      res.should.have.status(404);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal(404);
      expect(res.body.error).to.equal('Car not found');
    });

    it('Should fetch all car ads in the db and return 200 status code', async () => {
      const res = await chai.request(app)
        .get('/api/v1/car')
        .set('authorization', adminToken);
      res.should.have.status(200);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal(200);
      expect(res.body.data).to.be.an('array');
    });

    // // req.query?status=unsold
    it('Should fetch all unsold car ads in the db and return 200 status code', async () => {
      const res = await chai.request(app)
        .get('/api/v1/car?status=unsold');
      res.should.have.status(200);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal(200);
      expect(res.body.data).to.be.an('array');
    });

    // // req.query?status=qui
    // it('Should not fetch all unsold car ads(QUERY 1) in the db and return 404 status code', async () => {
    //   const res = await chai.request(app)
    //     .get('/api/v1/car?status=qui');
    //   res.should.have.status(404);
    //   res.body.should.be.an('object');
    //   expect(res.body.status).to.equal(404);
    //   expect(res.body.error).to.be.equal('Sorry, this does not exist');
    // });

    // // req.query?status=unsold&minprice&maxprice
    it('Should fetch all unsold cars ads by status&price range in the db and return 200 status code', async () => {
      const res = await chai.request(app)
        .get('/api/v1/car?status=unsold&minprice=15000000&maxprice=30000000');
      res.should.have.status(200);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal(200);
      expect(res.body.data).to.be.an('array');
    });

    // // req.query?status=unsold&minprice&maxprice(2)
    // it('Should not fetch all unsold cars ads by status&price(QUERY 2) range in the db and return 404 status code', async () => {
    //   const res = await chai.request(app)
    //     .get('/api/v1/car?status=unsold&minprice=15&maxprice=30');
    //   res.should.have.status(404);
    //   res.body.should.be.an('object');
    //   expect(res.body.status).to.equal(404);
    //   expect(res.body.error).to.be.equal('There is no result for your search now');
    // });

    it('Should return 401 status code not serve all Ads for non-admin', async () => {
      const res = await chai.request(app)
        .get('/api/v1/car')
        .set('authorization', userClaim);
      res.should.have.status(401);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal(401);
      expect(res.body.error).to.be.equal('You do not have permissions to access this route');
    });
  });

  describe('Test for PATCH endpoint', () => {
    it('Should allow owner update car ad status and return status code of 200', async () => {
      const res = await chai.request(app)
        .patch('/api/v1/car/6/status')
        .set('authorization', userClaim);
      res.should.have.status(200);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal(200);
      expect(res.body.data).to.be.an('object');
    });
    it('Should not allow owner(3) update car ad status and return status code of 422', async () => {
      const res = await chai.request(app)
        .patch('/api/v1/car/6/status')
        .set('authorization', userClaim);
      res.should.have.status(422);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal(422);
      expect(res.body.error).to.be.equal('This ad has already been marked as sold');
    });
    it('Should allow owner update car ad price and return status code of 200', async () => {
      const res = await chai.request(app)
        .patch('/api/v1/car/6/price')
        .set('authorization', userClaim)
        .send({ price: '3000000' });
      res.should.have.status(200);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal(200);
      expect(res.body.data).to.be.an('object');
    });
    it('Should not allow owner update car ad price with empty price field and return status code of 400', async () => {
      const res = await chai.request(app)
        .patch('/api/v1/car/6/price')
        .set('authorization', ownerClaim)
        .send({ price: '' });
      res.should.have.status(400);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal(400);
      expect(res.body.error).to.be.equal('Enter a price or retain the old price');
    });
    it('Should not allow owner update car ad price with invalid price values and return status code of 400', async () => {
      const res = await chai.request(app)
        .patch('/api/v1/car/2/price')
        .set('authorization', ownerClaim)
        .send({ price: 'a3000pq' });
      res.should.have.status(400);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal(400);
      expect(res.body.error).to.be.equal('Price should be only a string of numbers');
    });
  });

  describe('Test for DELETE endpoint', () => {
    it('Should allow admin delete a resource and return status code of 200', async () => {
      const res = await chai.request(app)
        .delete('/api/v1/car/3')
        .set('authorization', adminToken);
      res.should.have.status(200);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal(200);
      expect(res.body.data).to.be.equal('Car Ad successfully deleted');
    });
  });
});
