import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

import { validRegisterData, inValidRegisterData } from './mockData/user';
import { users } from '../dummyDb';

const { should, expect } = chai;
should();

chai.use(chaiHttp);

const url = '/api/v1/auth/register';

describe('Test for user route', () => {
  describe('Test for register API', () => {
    it('Should return 201 status code and create new user', async () => {
      const newLength = users.length + 1;
      const res = await chai.request(app)
        .post(url)
        .send(validRegisterData[0]);
      res.should.have.status(201);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal(201);
      expect(res.body.data).to.be.a('object');
      expect(users).to.have.length(newLength);
    });
    it('Should return 201 status code and create another user', async () => {
      const newLength = users.length + 1;
      const res = await chai.request(app)
        .post(url)
        .send(validRegisterData[1]);
      res.should.have.status(201);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal(201);
      expect(res.body.data).to.be.a('object');
      expect(users).to.have.length(newLength);
    });
    it('should return status code 400 and send error message for undefined/empty email', async () => {
      const res = await chai
        .request(app)
        .post(url)
        .send(inValidRegisterData[0]);
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('error');
      expect(res.body.status).to.equal(400);
      expect(res.body.error).to.be.an('object');
    });
    it('should return status code 400 and send error message for spaced email', async () => {
      const res = await chai
        .request(app)
        .post(url)
        .send(inValidRegisterData[1]);
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('error');
      expect(res.body.status).to.equal(400);
      expect(res.body.error).to.be.an('object');
    });
    it('should return status code 400 and send error message for invalid email format', async () => {
      const res = await chai
        .request(app)
        .post(url)
        .send(inValidRegisterData[2]);
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('error');
      expect(res.body.status).to.equal(400);
      expect(res.body.error).to.be.an('object');
    });
    it('should return status code 400 and send error message for existing email', async () => {
      const res = await chai
        .request(app)
        .post(url)
        .send(inValidRegisterData[3]);
      res.should.have.status(409);
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('error');
      expect(res.body.status).to.equal(409);
      expect(res.body.error).to.equal('Email in use already');
    });
    // firstname
    it('should return status code 400 and send error message for undefined/empty firstname', async () => {
      const res = await chai
        .request(app)
        .post(url)
        .send(inValidRegisterData[4]);
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('error');
      expect(res.body.status).to.equal(400);
      expect(res.body.error).to.be.an('object');
    });
    it('should return status code 400 and send error message for spaced firstname', async () => {
      const res = await chai
        .request(app)
        .post(url)
        .send(inValidRegisterData[5]);
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('error');
      expect(res.body.status).to.equal(400);
      expect(res.body.error).to.be.an('object');
    });
    it('should return status code 400 and send error message for short firstname', async () => {
      const res = await chai
        .request(app)
        .post(url)
        .send(inValidRegisterData[6]);
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('error');
      expect(res.body.status).to.equal(400);
      expect(res.body.error).to.be.an('object');
    });
    // lastname
    it('should return status code 400 and send error message for undefined/empty lastname', async () => {
      const res = await chai
        .request(app)
        .post(url)
        .send(inValidRegisterData[7]);
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('error');
      expect(res.body.status).to.equal(400);
      expect(res.body.error).to.be.an('object');
    });
    it('should return status code 400 and send error message for spaced lastname', async () => {
      const res = await chai
        .request(app)
        .post(url)
        .send(inValidRegisterData[8]);
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('error');
      expect(res.body.status).to.equal(400);
      expect(res.body.error).to.be.an('object');
    });
    // Password
    it('should return status code 400 and send error message for undefined/empty password', async () => {
      const res = await chai
        .request(app)
        .post(url)
        .send(inValidRegisterData[9]);
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('error');
      expect(res.body.status).to.equal(400);
      expect(res.body.error).to.be.an('object');
    });
    it('should return status code 400 and send error message for short password length', async () => {
      const res = await chai
        .request(app)
        .post(url)
        .send(inValidRegisterData[10]);
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('error');
      expect(res.body.status).to.equal(400);
      expect(res.body.error).to.be.an('object');
    });
    it('should return status code 400 and send error message for unspecified address', async () => {
      const res = await chai
        .request(app)
        .post(url)
        .send(inValidRegisterData[11]);
      res.should.have.status(400);
      res.body.should.be.a('object');
      res.body.should.have.property('status');
      res.body.should.have.property('error');
      expect(res.body.status).to.equal(400);
      expect(res.body.error).to.be.an('object');
    });
  });
});
