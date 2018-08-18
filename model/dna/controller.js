const Controller = require('../../lib/controller'),
  dnaFacade = require('./facade').dnaFacade,
  errors = require('../../services/errors');

class DnaController extends Controller {

  checkMutant(req, res, next) {
    // check if the requested dna matrix is from a dna
    return this.facade
      .checkMutant(req.body.dna)
      .then(result => {
        if (result) {
          res.status(200).send();
        } else {
          res.status(403).send();
        }
      })
      .catch(next)
  }

  getStats(req, res, next) {
    return this.facade
      .getStats()
      .then(stats => {
        res.status(200).json(stats);
      })
      .catch(next)
  }
}

module.exports.dnaController = new DnaController(dnaFacade);
