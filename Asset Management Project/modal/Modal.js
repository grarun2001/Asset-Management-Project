const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../database')

const employeemaster = sequelize.define('EmployeeMaster', {
    employeeID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    employeeName: {
        type: DataTypes.STRING,
    },
    dateofbirth:{
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    phoneNumber: {
        type: DataTypes.STRING,
    },
    
    isActive: {
        type: DataTypes.BOOLEAN,

    }
})


const assetmasters = sequelize.define('AssetMaster', {
    serialno: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    make: {
        type: DataTypes.STRING,
    },
    model:{
        type: DataTypes.STRING,
    },
    category: {
        type: DataTypes.STRING,
    },
    stockunit: {
        type: DataTypes.BOOLEAN,
    },
    issued: {
        type: DataTypes.BOOLEAN,
    },
    returned: {
        type: DataTypes.BOOLEAN,
    },
    reason: {
        type: DataTypes.STRING,
    },
    scrap: {
        type: DataTypes.BOOLEAN,
    }
})


module.exports = {employeemaster,assetmasters}