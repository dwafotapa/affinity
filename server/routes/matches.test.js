const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const server = require('../app');
const getDistanceFromLatLonInKm = require('../utils');

chai.use(chaiHttp);

describe('GET /matches', () => {
  it('should get all matches', (done) => {
    chai.request(server)
    .get('/matches')
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body.matches).to.be.an('array');
      done();
    });
  });

  it('should get all matches with a photo', (done) => {
    chai.request(server)
    .get('/matches?has-photo=1')
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
    .get('/matches?has-exchanged=1')
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
    .get('/matches?is-favourite=1')
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
    .get('/matches?compatibility-start=0.75')
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
    .get('/matches?compatibility-end=0.5')
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
    .get('/matches?compatibility-start=0.5&compatibility-end=0.75')
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body.matches).to.be.an('array');
      res.body.matches.forEach(match => {
        expect(match).to.have.property('compatibility_score').to.be.at.least(0.5).and.to.be.at.most(0.75);
      });
      done();
    });
  });

  it('should get all matches who are older than 30', (done) => {
    chai.request(server)
    .get('/matches?age-start=30')
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
    .get('/matches?age-end=40')
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
    .get('/matches?age-start=30&age-end=39')
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body.matches).to.be.an('array');
      res.body.matches.forEach(match => {
        expect(match).to.have.property('age').to.be.at.least(30).and.at.most(39);
      });
      done();
    });
  });

  it('should get all matches who are taller than 170cm', (done) => {
    chai.request(server)
    .get('/matches?height-start=170')
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
    .get('/matches?height-end=170')
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
    .get('/matches?height-start=160&height-end=170')
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body.matches).to.be.an('array');
      res.body.matches.forEach(match => {
        expect(match).to.have.property('height_in_cm').to.be.at.least(160).and.at.most(170);
      });
      done();
    });
  });

  it('should get all matches who are located further than 300km', (done) => {
    chai.request(server)
    .get('/matches?distance-start=300')
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
    .get('/matches?distance-end=30')
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
    .get('/matches?distance-start=30&distance-end=100')
    .end((err, res) => {
      const user = server.get('user');

      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body.matches).to.be.an('array');
      res.body.matches.forEach(match => {
        const distance = getDistanceFromLatLonInKm(user.city.lat, user.city.lon, match.city.lat, match.city.lon);
        expect(distance).to.be.at.least(30).and.at.most(100);
      });
      done();
    });
  });
});