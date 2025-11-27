const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Denuncia = sequelize.define(
  "Denuncia",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    titulo: { type: DataTypes.STRING(200), allowNull: false },
    descricao: { type: DataTypes.TEXT, allowNull: false },
    usuarioId: { type: DataTypes.INTEGER, allowNull: false }
  },
  {
    tableName: "denuncias",
    timestamps: false
  }
);

module.exports = Denuncia;
