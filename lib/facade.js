class Facade {
  constructor(Schema) {
    this.Schema = Schema;
  }

  create(input) {
    return this.Schema.create(input);
  }
}

module.exports = Facade;
