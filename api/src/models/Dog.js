const { DataTypes } = require('sequelize');

module.exports = (database) => {

  database.define('dog', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      },
      height: {
        type: DataTypes.STRING,
        allowNull: false
      },
      weight:{
        type: DataTypes.STRING,
        allowNull: false
      },
      yearsOfLive:{
        type: DataTypes.INTEGER,
        allowNull: false
      },
      flag: {
        type: DataTypes.STRING,
        allowNull: true
      }
    }
  },{ timestamps: false });
};
