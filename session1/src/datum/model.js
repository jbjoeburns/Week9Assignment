const {DataTypes} = require("sequelize")
const connection = require("../db/connection")

const Data = connection.define("Data", {
    realname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

module.exports = Data