// Import necessary modules
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js'); // Connect to database

// Define Post model as a subclass of Sequelize's Model class
class Post extends Model { }

// Define the structure of the Post model
Post.init(
    {
       title: DataTypes.STRING,
       body: DataTypes.TEXT
    },
    {
        sequelize // Associate the Post model with the Sequelize instance
    }
);

// Export the Post model for use in other parts of the application
module.exports = Post;
