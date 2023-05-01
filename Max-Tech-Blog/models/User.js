// Import necessary packages and modules
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection.js');

// Create User model by extending Sequelize's Model class
class User extends Model { 

      // Method to check if provided password matches user's stored password
      checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}
// Define User model's attributes and configurations
User.init(
    {   // Define id column as integer, not null, primary key, and auto-incrementing
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true

        },
        // Define username column as string and not null
        username: {
            type: DataTypes.STRING,
            allowNull: false

        },
        // Define password column as string, not null, and with minimum length of 4 characters
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        }
    },
    {
        // Define hooks for creating and updating user data
        hooks: {
            // Before creating a new user, hash the password
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
               // Before updating a user, hash the updated password
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
        // Pass in the database connection instance
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'User'
    }
);
// Export User model
module.exports = User;