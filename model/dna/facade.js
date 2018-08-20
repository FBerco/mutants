const Facade = require('../../lib/facade'),
  Dna = require('../../model').dna,
  sequelize = require('../../model').sequelize;

class DnaFacade extends Facade {
  constructor(Schema) {
    super(Schema);
    this.pattern = /([atcg])\1\1\1/gi;
  }

  diagonal(matrix, count, BottomStart) {
    //we start from position 4 because if starting before, the sequence won't have 4 characters
    const n = matrix[0].length;
    for (let t = 3; t <= (2 * n - 1) - 3; t++) {
      let word = [];
      for (let i = n - 1; i >= 0; --i) {
        var j = t - (BottomStart ? n - i : i);
        if (j >= 0 && j < n) { //bound limits
          word.push(matrix[i][j]); //forming the sequence
        }
      }
      count += (word.join().match(this.pattern) || []).length;
    }
    return count;
  }
  //returning cont because if maybe in the dna is one consecutive match diagonal starting from the top, and another starting from the bottom

  isMutant(dna) {
    const n = dna[0].length;
    let count = 0;

    //horizontal
    for (let i = 0; i < n - 1; i++) {
      count += (dna[i].match(this.pattern) || []).length;
    }

    if (count > 1) {
      return true;
    }
    
    //vertical
    for (let j = 0; j < n - 1; j++) {
      let word = "";
      for (let i = 0; i < n - 1; i++) {
        word += dna[i][j];
      }
      count += (word.match(this.pattern) || []).length
    }

    if (count > 1) {
      return true;
    }

    //I'm analyzing the diagonals to the right    
    if ((count = this.diagonal(dna, count, true)) > 1) { //diagonals starting from the bottom
      return true;
    }
    return this.diagonal(dna, count, false) > 1; //diagonals starting from the top
  }

  checkMutant(dna) {
    return super.create({
      dna,
      isMutant: this.isMutant(dna)
    }).then(createdDna => createdDna.isMutant)
  }

  getStats() {
    return sequelize.query(`
      SELECT count(*) as "count_human_dna", 
      (
        SELECT count(*) FROM dna WHERE is_mutant=true
      ) as "count_mutant_dna" 
      FROM dna;`)
      .spread(results => {
        if (results[0].count_human_dna == 0) return 'No humans in database';
        const ratio = results[0].count_mutant_dna / results[0].count_human_dna
        Object.assign(results[0], {
          ratio: Math.round(ratio * 100) / 100
        });
        return results[0];
      });
  }
}

module.exports.dnaFacade = new DnaFacade(Dna);
