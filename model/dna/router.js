const dnaController = require('./controller').dnaController,
  Router = require('express').Router,
  router = new Router();

router
  .route('/mutant')
  .post((...args) => dnaController.checkMutant(...args));

router
  .route('/stats')
  .get((...args) => dnaController.getStats(...args));

module.exports = router;
