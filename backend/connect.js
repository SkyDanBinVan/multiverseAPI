const Sequelize = require("sequelize");
const { messageModel } = require("./models/models");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./path/to/database.sqlite",
});
const Message = sequelize.define("Messages", messageModel)


module.exports = { sequelize, Message };