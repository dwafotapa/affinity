const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const config = require('../config');
const server = require('../app');
const getDistanceFromLatLonInKm = require('../utils');

chai.use(chaiHttp);

describe('GET /api/matches', () => {
  it('should get all matches', (done) => {
    chai.request(server)
    .get('/api/matches')
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body.matches).to.be.an('array');
      done();
    });
  });

  it('should get all matches with a photo', (done) => {
    chai.request(server)
    .get('/api/matches?has-photo=true')
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body.matches).to.be.an('array');
      res.body.matches.forEach(match => {
        expect(match).to.have.property('main_photo');
      });
      done();
    });
  });

  it('should get all matches in contact', (done) => {
    chai.request(server)
    .get('/api/matches?has-exchanged=true')
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body.matches).to.be.an('array');
      res.body.matches.forEach(match => {
        expect(match).to.have.property('contacts_exchanged').to.be.greaterThan(0);
      });
      done();
    });
  });

  it('should get all favourite matches', (done) => {
    chai.request(server)
    .get('/api/matches?is-favourite=true')
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body.matches).to.be.an('array');
      res.body.matches.forEach(match => {
        expect(match).to.have.property('favourite').to.be.true;
      });
      done();
    });
  });

  it('should get all matches with a compatibility score >= 0.75', (done) => {
    chai.request(server)
    .get('/api/matches?compatibility-start=0.75')
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body.matches).to.be.an('array');
      res.body.matches.forEach(match => {
        expect(match).to.have.property('compatibility_score').to.be.at.least(0.75);
      });
      done();
    });
  });

  it('should get all matches with a compatibility score <= 0.5', (done) => {
    chai.request(server)
    .get('/api/matches?compatibility-end=0.5')
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body.matches).to.be.an('array');
      res.body.matches.forEach(match => {
        expect(match).to.have.property('compatibility_score').to.be.at.most(0.5);
      });
      done();
    });
  });

  it('should get all matches with a compatibility score between 0.5 and 0.75', (done) => {
    chai.request(server)
    .get('/api/matches?compatibility-start=0.5&compatibility-end=0.75')
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body.matches).to.be.an('array');
      res.body.matches.forEach(match => {
        expect(match).to.have.property('compatibility_score').to.be.within(0.5, 0.75);
      });
      done();
    });
  });

  it('should get all matches who are older than 30', (done) => {
    chai.request(server)
    .get('/api/matches?age-start=30')
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body.matches).to.be.an('array');
      res.body.matches.forEach(match => {
        expect(match).to.have.property('age').to.be.at.least(30);
      });
      done();
    });
  });

  it('should get all matches who are younger than 40', (done) => {
    chai.request(server)
    .get('/api/matches?age-end=40')
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body.matches).to.be.an('array');
      res.body.matches.forEach(match => {
        expect(match).to.have.property('age').to.be.at.most(40);
      });
      done();
    });
  });

  it('should get all matches who are in their 30s', (done) => {
    chai.request(server)
    .get('/api/matches?age-start=30&age-end=39')
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body.matches).to.be.an('array');
      res.body.matches.forEach(match => {
        expect(match).to.have.property('age').to.be.within(30, 39);
      });
      done();
    });
  });

  it('should get all matches who are taller than 170cm', (done) => {
    chai.request(server)
    .get('/api/matches?height-start=170')
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body.matches).to.be.an('array');
      res.body.matches.forEach(match => {
        expect(match).to.have.property('height_in_cm').to.be.at.least(170);
      });
      done();
    });
  });

  it('should get all matches who are smaller than 170cm', (done) => {
    chai.request(server)
    .get('/api/matches?height-end=170')
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body.matches).to.be.an('array');
      res.body.matches.forEach(match => {
        expect(match).to.have.property('height_in_cm').to.be.at.most(170);
      });
      done();
    });
  });

  it('should get all matches who are between 160cm and 170cm', (done) => {
    chai.request(server)
    .get('/api/matches?height-start=160&height-end=170')
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body.matches).to.be.an('array');
      res.body.matches.forEach(match => {
        expect(match).to.have.property('height_in_cm').to.be.within(160, 170);
      });
      done();
    });
  });

  it('should get all matches who are located further than 300km', (done) => {
    chai.request(server)
    .get('/api/matches?distance-start=300')
    .end((err, res) => {
      const user = server.get('user');
      
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body.matches).to.be.an('array');
      res.body.matches.forEach(match => {
        const distance = getDistanceFromLatLonInKm(user.city.lat, user.city.lon, match.city.lat, match.city.lon);
        expect(distance).to.be.at.least(300);
      });
      done();
    });
  });

  it('should get all matches who are located within 30km', (done) => {
    chai.request(server)
    .get('/api/matches?distance-end=30')
    .end((err, res) => {
      const user = server.get('user');

      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body.matches).to.be.an('array');
      res.body.matches.forEach(match => {
        const distance = getDistanceFromLatLonInKm(user.city.lat, user.city.lon, match.city.lat, match.city.lon);
        expect(distance).to.be.at.most(30);
      });
      done();
    });
  });

  it('should get all matches who are located within 30km and 100km', (done) => {
    chai.request(server)
    .get('/api/matches?distance-start=30&distance-end=100')
    .end((err, res) => {
      const user = server.get('user');

      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body.matches).to.be.an('array');
      res.body.matches.forEach(match => {
        const distance = getDistanceFromLatLonInKm(user.city.lat, user.city.lon, match.city.lat, match.city.lon);
        expect(distance).to.be.within(30, 100);
      });
      done();
    });
  });

  it('should get a 404 json object if has-photo is neither true nor false', (done) => {
    chai.request(server)
    .get('/api/matches?has-photo=neithertruenorfalse')
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.error).to.be.an('object');
      expect(res.body.error).to.eql({
        status: 400,
        message: config.ERR_MSG_HAS_PHOTO_FILTER
      });
      done();
    });
  });

  it('should get a 404 json object if has-exchanged is neither true nor false', (done) => {
    chai.request(server)
    .get('/api/matches?has-exchanged=neithertruenorfalse')
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.error).to.be.an('object');
      expect(res.body.error).to.eql({
        status: 400,
        message: config.ERR_MSG_HAS_EXCHANGED_FILTER
      });
      done();
    });
  });

  it('should get a 404 json object if is-favourite is neither true nor false', (done) => {
    chai.request(server)
    .get('/api/matches?is-favourite=neithertruenorfalse')
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.error).to.be.an('object');
      expect(res.body.error).to.eql({
        status: 400,
        message: config.ERR_MSG_IS_FAVOURITE_FILTER
      });
      done();
    });
  });

  it('should get a 404 json object if compatibility-start is not a number', (done) => {
    chai.request(server)
    .get('/api/matches?compatibility-start=now')
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.error).to.be.an('object');
      expect(res.body.error).to.eql({
        status: 400,
        message: config.ERR_MSG_COMPATIBILITY_START_FILTER
      });
      done();
    });
  });

  it('should get a 404 json object if compatibility-start is a number out of range', (done) => {
    chai.request(server)
    .get('/api/matches?compatibility-start=5')
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.error).to.be.an('object');
      expect(res.body.error).to.eql({
        status: 400,
        message: config.ERR_MSG_COMPATIBILITY_START_FILTER
      });
      done();
    });
  });

  it('should get a 404 json object if compatibility-end is not a number', (done) => {
    chai.request(server)
    .get('/api/matches?compatibility-end=tomorrow')
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.error).to.be.an('object');
      expect(res.body.error).to.eql({
        status: 400,
        message: config.ERR_MSG_COMPATIBILITY_END_FILTER
      });
      done();
    });
  });

  it('should get a 404 json object if compatibility-end is a number out of range', (done) => {
    chai.request(server)
    .get('/api/matches?compatibility-end=10')
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.error).to.be.an('object');
      expect(res.body.error).to.eql({
        status: 400,
        message: config.ERR_MSG_COMPATIBILITY_END_FILTER
      });
      done();
    });
  });

  it('should get a 404 json object if age-start is not a number', (done) => {
    chai.request(server)
    .get('/api/matches?age-start=yesterday')
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.error).to.be.an('object');
      expect(res.body.error).to.eql({
        status: 400,
        message: config.ERR_MSG_AGE_START_FILTER
      });
      done();
    });
  });

  it('should get a 404 json object if age-start is a number out of range', (done) => {
    chai.request(server)
    .get('/api/matches?age-start=17')
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.error).to.be.an('object');
      expect(res.body.error).to.eql({
        status: 400,
        message: config.ERR_MSG_AGE_START_FILTER
      });
      done();
    });
  });

  it('should get a 404 json object if age-end is not a number', (done) => {
    chai.request(server)
    .get('/api/matches?age-end=notanumber')
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.error).to.be.an('object');
      expect(res.body.error).to.eql({
        status: 400,
        message: config.ERR_MSG_AGE_END_FILTER
      });
      done();
    });
  });

  it('should get a 404 json object if age-end is a number out of range', (done) => {
    chai.request(server)
    .get('/api/matches?age-end=100')
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.error).to.be.an('object');
      expect(res.body.error).to.eql({
        status: 400,
        message: config.ERR_MSG_AGE_END_FILTER
      });
      done();
    });
  });

  it('should get a 404 json object if height-start is not a number', (done) => {
    chai.request(server)
    .get('/api/matches?height-start=stillnotanumber')
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.error).to.be.an('object');
      expect(res.body.error).to.eql({
        status: 400,
        message: config.ERR_MSG_HEIGHT_START_FILTER
      });
      done();
    });
  });

  it('should get a 404 json object if height-start is a number out of range', (done) => {
    chai.request(server)
    .get('/api/matches?height-start=300')
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.error).to.be.an('object');
      expect(res.body.error).to.eql({
        status: 400,
        message: config.ERR_MSG_HEIGHT_START_FILTER
      });
      done();
    });
  });

  it('should get a 404 json object if height-end is not a number', (done) => {
    chai.request(server)
    .get('/api/matches?height-end=notanumber')
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.error).to.be.an('object');
      expect(res.body.error).to.eql({
        status: 400,
        message: config.ERR_MSG_HEIGHT_END_FILTER
      });
      done();
    });
  });

  it('should get a 404 json object if height-end is a number out of range', (done) => {
    chai.request(server)
    .get('/api/matches?height-end=112')
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.error).to.be.an('object');
      expect(res.body.error).to.eql({
        status: 400,
        message: config.ERR_MSG_HEIGHT_END_FILTER
      });
      done();
    });
  });

  it('should get a 404 json object if distance-start is not a number', (done) => {
    chai.request(server)
    .get('/api/matches?distance-start=veryfar')
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.error).to.be.an('object');
      expect(res.body.error).to.eql({
        status: 400,
        message: config.ERR_MSG_DISTANCE_START_FILTER
      });
      done();
    });
  });

  it('should get a 404 json object if distance-end is not a number', (done) => {
    chai.request(server)
    .get('/api/matches?distance-end=farfaraway')
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.error).to.be.an('object');
      expect(res.body.error).to.eql({
        status: 400,
        message: config.ERR_MSG_DISTANCE_END_FILTER
      });
      done();
    });
  });
});