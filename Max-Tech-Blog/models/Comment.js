// Import necessary dependencies from Sequelize
const { Sequelize, Model, DataTypes } = require('sequelize');

// Import connection configuration from connection.js
const sequelize = require('../config/connection.js');

// Define a Comment model class which extends Sequelize's Model class
class Comment extends Model { }

// Initialize the Comment model with its attributes and options
Comment.init(
    { 
        // Define a body attribute of type STRING and disallow null values
        body: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        // Pass in the sequelize object for database connection
        sequelize
    }
);
// Export the Comment model for use in other modules
module.exports = Comment;