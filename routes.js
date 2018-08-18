const Router = require('express').Router,
  router = new Router();

const dna = require('./model/dna/router');

router.route('/').get((req, res) => {
  res.json({ message: 'Welcome to mutants-api API!' });
});

router.use(dna);

module.exports = router;
