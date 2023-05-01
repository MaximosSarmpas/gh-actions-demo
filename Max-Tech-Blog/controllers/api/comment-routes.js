// Import the required dependencies
const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth.js");

// POST route for creating a new comment
router.post("/", withAuth, (req, res) => {

    // Create a new comment using the request body and the session user's ID
    Comment.create({ ...req.body, userId: req.session.userId })
        .then(newComment => {

            // If the comment was created successfully, send the new comment as a JSON response
            res.json(newComment);
        })
        .catch(err => {
            // If there was an error, respond with a 500 status code and the error as JSON
            res.status(500).json(err);
        });
});
// Export the router to be used in other parts of the application
module.exports = router;