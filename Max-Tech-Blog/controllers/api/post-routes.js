
// Require the necessary packages and models
const router = require("express").Router();
const { Post, Comment, User } = require("../../models/");
const withAuth = require("../../utils/auth");

// Handle a POST request to create a new post
router.post("/", withAuth, (req, res) => {
    const body = req.body;

    // Log the user ID from the current session
    console.log(req.session.userId);

    // Create a new post and associate it with the current user
    Post.create({ ...body, userId: req.session.userId })
        .then(newPost => {
            res.json(newPost);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

// Handle a PUT request to update an existing post
router.put("/:id", withAuth, (req, res) => {
    // Update the post with the provided ID and new information
    Post.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(affectedRows => {
            if (affectedRows > 0) {
                res.status(200).end();  // Successful update
            } else {
                res.status(404).end();  // Post not found
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

// Handle a DELETE request to remove an existing post
router.delete("/:id", withAuth, (req, res) => {
    // Delete the post with the provided ID
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(affectedRows => {
            if (affectedRows > 0) {
                res.status(200).end();  // Successful delete
            } else {
                res.status(404).end();  // Post not found
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

// Export the router for use in other modules
module.exports = router;
