// Import required modules and libraries
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");

// Create an instance of Express
const app = express();

// Set the port number to listen on
const PORT = process.env.PORT || 3002;

// Import the sequelize instance and the SequelizeStore to store session data
const sequelize = require("./config/connection.js");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Set the session configuration options
const sess = {
    secret: "Super secret",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

// Set up the session middleware 
app.use(session(sess));

// Create an instance of Handlebars with a custom helper function
const hbs = exphbs.create({
    helpers: {
        format_date: date => {
            return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        }
    }
});

// Set up Handlebars as the view engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Set up middleware to handle JSON data and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// Set up static file serving for the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Set up the application routes using the controllers defined in the controllers folder
app.use(require('./controllers'));

// Start listening for incoming requests on the specified port
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);

    // Sync the sequelize models to the database
    sequelize.sync({ force: false});
})