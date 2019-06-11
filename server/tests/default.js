import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

const { should, expect } = chai;
should();

chai.use(chaiHttp);

const url = '/balderdash';
const msg1 = 'Welcome to Automart, your best bet for car sales';
const msg2 = 'Sorry, page not found!';

describe('Test for index route', () => {
  describe('GET request to home page', () => {
    it('It should return the page', async () => {
      const res = await chai.request(app)
        .get('/api/v1');
      res.should.have.status(200);
      res.body.should.be.a('object');
      expect(res.body.data).to.equal(msg1);
    });
  });
  it('It should return page not found', async () => {
    const res = await chai.request(app)
      .get(url);
    res.should.have.status(404);
    res.body.should.be.a('object');
    expect(res.body.error).to.equal(msg2);
  });
});
