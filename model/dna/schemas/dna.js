module.exports = (sequelize, DataTypes) => {
  const Dna = sequelize.define(
    'dna',
    {
      id: {
        type: DataTypes.INTEGER,
        field: 'id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      dna: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      isMutant: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false,
        field: 'is_mutant'
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
        field: 'created_at'
      }
    },
    {
      timestamps: false,
      paranoid: true,
      underscored: true,
      freezeTableName: true
    }
  );

  return Dna;
};
