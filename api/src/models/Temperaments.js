const { DataTypes } = require('sequelize');

module.exports = (database) => {

    database.define('temperament', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
          }
  }, { timestamps: false });
};