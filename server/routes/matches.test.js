const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const config = require('../config');
const server = require('../app');
const getDistanceFromLatLonInKm = require('../utils/distance');

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
    .get('/api/matches?hasPhoto=true')
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
    .get('/api/matches?hasExchanged=true')
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
    .get('/api/matches?isFavourite=true')
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
    .get('/api/matches?compatibilityScoreMin=0.75')
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
    .get('/api/matches?compatibilityScoreMax=0.5')
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
    .get('/api/matches?compatibilityScoreMin=0.5&compatibilityScoreMax=0.75')
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
    .get('/api/matches?ageMin=30')
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
    .get('/api/matches?ageMax=40')
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
    .get('/api/matches?ageMin=30&ageMax=39')
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
    .get('/api/matches?heightMin=170')
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
    .get('/api/matches?heightMax=170')
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
    .get('/api/matches?heightMin=160&heightMax=170')
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
    .get('/api/matches?distanceMin=300')
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
    .get('/api/matches?distanceMax=30')
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
    .get('/api/matches?distanceMin=30&distanceMax=100')
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

  it('should get a 404 json object if hasPhoto is neither true nor false', (done) => {
    chai.request(server)
    .get('/api/matches?hasPhoto=neithertruenorfalse')
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.error).to.be.an('object');
      expect(res.body.error).to.eql({
        status: 400,
        message: config.ERR_MSG_PARAM_HAS_PHOTO
      });
      done();
    });
  });

  it('should get a 404 json object if hasExchanged is neither true nor false', (done) => {
    chai.request(server)
    .get('/api/matches?hasExchanged=neithertruenorfalse')
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.error).to.be.an('object');
      expect(res.body.error).to.eql({
        status: 400,
        message: config.ERR_MSG_PARAM_HAS_EXCHANGED
      });
      done();
    });
  });

  it('should get a 404 json object if isFavourite is neither true nor false', (done) => {
    chai.request(server)
    .get('/api/matches?isFavourite=neithertruenorfalse')
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.error).to.be.an('object');
      expect(res.body.error).to.eql({
        status: 400,
        message: config.ERR_MSG_PARAM_IS_FAVOURITE
      });
      done();
    });
  });

  it('should get a 404 json object if compatibilityScoreMin is not a number', (done) => {
    chai.request(server)
    .get('/api/matches?compatibilityScoreMin=now')
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.error).to.be.an('object');
      expect(res.body.error).to.eql({
        status: 400,
        message: config.ERR_MSG_PARAM_COMPATIBILITY_SCORE_MIN
      });
      done();
    });
  });

  it('should get a 404 json object if compatibilityScoreMin is a number out of range', (done) => {
    chai.request(server)
    .get('/api/matches?compatibilityScoreMin=5')
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.error).to.be.an('object');
      expect(res.body.error).to.eql({
        status: 400,
        message: config.ERR_MSG_PARAM_COMPATIBILITY_SCORE_MIN
      });
      done();
    });
  });

  it('should get a 404 json object if compatibilityScoreMax is not a number', (done) => {
    chai.request(server)
    .get('/api/matches?compatibilityScoreMax=tomorrow')
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.error).to.be.an('object');
      expect(res.body.error).to.eql({
        status: 400,
        message: config.ERR_MSG_PARAM_COMPATIBILITY_SCORE_MAX
      });
      done();
    });
  });

  it('should get a 404 json object if compatibilityScoreMax is a number out of range', (done) => {
    chai.request(server)
    .get('/api/matches?compatibilityScoreMax=10')
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.error).to.be.an('object');
      expect(res.body.error).to.eql({
        status: 400,
        message: config.ERR_MSG_PARAM_COMPATIBILITY_SCORE_MAX
      });
      done();
    });
  });

  it('should get a 404 json object if ageMin is not a number', (done) => {
    chai.request(server)
    .get('/api/matches?ageMin=yesterday')
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.error).to.be.an('object');
      expect(res.body.error).to.eql({
        status: 400,
        message: config.ERR_MSG_PARAM_AGE_MIN
      });
      done();
    });
  });

  it('should get a 404 json object if ageMin is a number out of range', (done) => {
    chai.request(server)
    .get('/api/matches?ageMin=17')
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.error).to.be.an('object');
      expect(res.body.error).to.eql({
        status: 400,
        message: config.ERR_MSG_PARAM_AGE_MIN
      });
      done();
    });
  });

  it('should get a 404 json object if ageMax is not a number', (done) => {
    chai.request(server)
    .get('/api/matches?ageMax=notanumber')
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.error).to.be.an('object');
      expect(res.body.error).to.eql({
        status: 400,
        message: config.ERR_MSG_PARAM_AGE_MAX
      });
      done();
    });
  });

  it('should get a 404 json object if ageMax is a number out of range', (done) => {
    chai.request(server)
    .get('/api/matches?ageMax=100')
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.error).to.be.an('object');
      expect(res.body.error).to.eql({
        status: 400,
        message: config.ERR_MSG_PARAM_AGE_MAX
      });
      done();
    });
  });

  it('should get a 404 json object if heightMin is not a number', (done) => {
    chai.request(server)
    .get('/api/matches?heightMin=stillnotanumber')
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.error).to.be.an('object');
      expect(res.body.error).to.eql({
        status: 400,
        message: config.ERR_MSG_PARAM_HEIGHT_MIN
      });
      done();
    });
  });

  it('should get a 404 json object if heightMin is a number out of range', (done) => {
    chai.request(server)
    .get('/api/matches?heightMin=300')
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.error).to.be.an('object');
      expect(res.body.error).to.eql({
        status: 400,
        message: config.ERR_MSG_PARAM_HEIGHT_MIN
      });
      done();
    });
  });

  it('should get a 404 json object if heightMax is not a number', (done) => {
    chai.request(server)
    .get('/api/matches?heightMax=notanumber')
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.error).to.be.an('object');
      expect(res.body.error).to.eql({
        status: 400,
        message: config.ERR_MSG_PARAM_HEIGHT_MAX
      });
      done();
    });
  });

  it('should get a 404 json object if heightMax is a number out of range', (done) => {
    chai.request(server)
    .get('/api/matches?heightMax=112')
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.error).to.be.an('object');
      expect(res.body.error).to.eql({
        status: 400,
        message: config.ERR_MSG_PARAM_HEIGHT_MAX
      });
      done();
    });
  });

  it('should get a 404 json object if distanceMin is not a number', (done) => {
    chai.request(server)
    .get('/api/matches?distanceMin=veryfar')
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.error).to.be.an('object');
      expect(res.body.error).to.eql({
        status: 400,
        message: config.ERR_MSG_PARAM_DISTANCE_MIN
      });
      done();
    });
  });

  it('should get a 404 json object if distanceMin is negative', (done) => {
    chai.request(server)
    .get('/api/matches?distanceMin=-1')
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.error).to.be.an('object');
      expect(res.body.error).to.eql({
        status: 400,
        message: config.ERR_MSG_PARAM_DISTANCE_MIN
      });
      done();
    });
  });

  it('should get a 404 json object if distanceMax is not a number', (done) => {
    chai.request(server)
    .get('/api/matches?distanceMax=farfaraway')
    .end((err, res) => {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body.error).to.be.an('object');
      expect(res.body.error).to.eql({
        status: 400,
        message: config.ERR_MSG_PARAM_DISTANCE_MAX
      });
      done();
    });
  });
});