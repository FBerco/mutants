const chai = require('chai'),
  server = require('../index'),
  models = require('../model'),
  should = chai.should();

describe('DNA', () => {
  describe('/mutant POST', () => {
    describe('should save a mutant', () => {
      it('with 2 vertical patterns', done => {
        models.dna.count({ where: { isMutant: true } }).then(mutantQty => {
          return chai
            .request(server)
            .post('/mutant')
            .send({
              dna: ['ATGTGA', 'CAGTGC', 'TTATGT', 'AGATGG', 'CACCTA', 'TCACTG']
            })
            .then(response => {
              return models.dna.count({ where: { isMutant: true } }).then(newMutantQty => {
                newMutantQty.should.be.equal(mutantQty + 1);
                response.should.have.status(200);
              });
            })
            .then(() => done());
        });
      });

      it('with 2 horizontal patterns', done => {
        models.dna.count({ where: { isMutant: true } }).then(mutantQty => {
          return chai
            .request(server)
            .post('/mutant')
            .send({
              dna: ['ATGCGA', 'CAGTGC', 'TTGGGG', 'AGAAGG', 'CCCCTA', 'TCACTG']
            })
            .then(response => {
              return models.dna.count({ where: { isMutant: true } }).then(newMutantQty => {
                newMutantQty.should.be.equal(mutantQty + 1);
                response.should.have.status(200);
              });
            })
            .then(() => done());
        });
      });

      it('with 2 diagonal patterns', done => {
        models.dna.count({ where: { isMutant: true } }).then(mutantQty => {
          return chai
            .request(server)
            .post('/mutant')
            .send({
              dna: ['ATGTGA', 'CATTGC', 'TTATGT', 'AGATGG', 'CCGCTA', 'TCACTG']
            })
            .then(response => {
              return models.dna.count({ where: { isMutant: true } }).then(newMutantQty => {
                newMutantQty.should.be.equal(mutantQty + 1);
                response.should.have.status(200);
              });
            })
            .then(() => done());
        });
      });
    });

    describe('should save a human', () => {
      it('because of not being mutant', done => {
        models.dna.count({ where: { isMutant: false } }).then(humanQty => {
          return chai
            .request(server)
            .post('/mutant')
            .send({
              dna: ['XYZWXW', 'XYZWXW', 'XYZWXW', 'XYZWXW', 'XYZWXW', 'XYZWXW']
            })
            .then(response => {
              return models.dna.count({ where: { isMutant: false } }).then(newHumanQty => {
                newHumanQty.should.be.equal(humanQty + 1);
                response.should.have.status(403);
              });
            })
            .then(() => done());
        });
      });
    });
  });

  describe('/stats GET', () => {
    describe('when there are no humans in database', () => {
      it('return an informational message', done => {
        chai
          .request(server)
          .get('/stats')
          .then(response => {
            response.should.have.status(200);
            response.body.should.equal('No humans in database');
          })
          .then(() => done());
      });
    });

    describe('when there are existing humans in database', () => {
      beforeEach(done => {
        models.dna.bulkCreate([
          {
            dna: ['aaaa'],
            isMutant: true
          },
          {
            dna: ['bbbb']
          },
          {
            dna: ['llll']
          }
        ]).then(() => done());
      });

      it('return an informational message', done => {
        chai
          .request(server)
          .get('/stats')
          .then(response => {
            response.should.have.status(200);
            response.body.count_human_dna.should.equal('3');
            response.body.count_mutant_dna.should.equal('1');
            response.body.ratio.should.equal(0.33);
          })
          .then(() => done());
      });
    });
  });
});
