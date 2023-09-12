const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (database) => {

    database.define('temperament', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
          }
  }, { timestamps: false });
};