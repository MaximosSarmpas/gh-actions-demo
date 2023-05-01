//required dependencies 
const Sequelize = require('sequelize');

// Load environment variables from a .env file
require('dotenv').config();


let sequelize;

// If the JAWSDB_URL environment variable is set (indicating that the app is being hosted on Heroku), create a new Sequelize instance using that URL
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
}

// Otherwise, create a new Sequelize instance using the values of the DB_NAME, DB_USER, and DB_PW environment variables
else {
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    });
}

module.exports = sequelize;