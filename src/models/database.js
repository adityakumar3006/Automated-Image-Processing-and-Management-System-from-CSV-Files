const { Sequelize, DataTypes } = require('sequelize');
const config = require('../../config/config');

const sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    {
        host: config.development.host,
        dialect: config.development.dialect,
    }
);


const Request = sequelize.define('Request', {
    id: { type: DataTypes.STRING, primaryKey: true },
    status: { type: DataTypes.STRING, allowNull: false },

    createdAt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW }
});

const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    serialNumber: { type: DataTypes.STRING },
    productName: { type: DataTypes.STRING, allowNull: false },
    inputImageUrls: { type: DataTypes.TEXT, allowNull: false },
    outputImageUrls: { type: DataTypes.TEXT },
    requestId: { type: DataTypes.STRING, references: { model: 'requests', key: 'id' } },
    createdAt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: Sequelize.NOW }
});

sequelize.sync();

module.exports = { sequelize, Request, Product };
