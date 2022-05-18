const sequelize = require('sequelize');

const messageModel = {
    message: {
        type: sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg : "User must have name."
            }
        }
    }
}
module.exports = { messageModel }