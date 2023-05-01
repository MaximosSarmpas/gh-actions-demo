// Import required dependencies
const router = require("express").Router();
const { User } = require("../../models");

// Route for creating a new user
router.post("/", (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(dbUserData => {
        // Save user data to session and respond with JSON data
        req.session.save(() => {
            req.session.userId = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json(dbUserData);
        });
    })
    .catch(err => {
        // Log and respond with error status code and JSON data
        console.log(err);
        res.status(500).json(err);
    });
});

// Route for user login
router.post("/login", (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            // If no user is found with the given username, respond with 400 status code and JSON data
            res.status(400).json({ message: 'No user account found!' });
            return;
        }

        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            // If the provided password is incorrect, respond with 400 status code and JSON data
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

        // Save user data to session and respond with JSON data
        req.session.save(() => {
            req.session.userId = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    });
});

// Route for user logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        // If user is logged in, destroy session and respond with 204 status code
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        // If user is not logged in, respond with 404 status code
        res.status(404).end();
    }
});

// Route for deleting a user by ID
router.delete("/user/:id", (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            // If no user is found with the given ID, respond with 404 status code and JSON data
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        // Respond with JSON data
        res.json(dbUserData);
    })
    .catch(err => {
        // Log and respond with error status code and JSON data
        console.log(err);
        res.status(500).json(err);
    });
});

// Export router
module.exports = router;
