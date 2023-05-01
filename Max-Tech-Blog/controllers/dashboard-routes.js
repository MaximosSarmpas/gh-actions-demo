// Import necessary modules and files
const router = require('express').Router();
const { Post } = require("../models");
const withAuth = require("../utils/auth.js");

// Route to get all posts for logged in user
router.get("/", withAuth, (req, res) => {
    // Find all posts for the current user
    Post.findAll({
        where: {
            userId: req.session.userId
        }
    })
    .then(dbPostData => {
        // Render the all-posts-admin template with the posts data
        const posts = dbPostData.map((post) => post.get ({ plain: true }));
        res.render("all-posts-admin", {
            layout: "dashboard",
            posts,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        // If there is an error, redirect to the login page
        console.log(err);
        res.redirect("login");
    });
});

// Route to render the new post form
router.get("/new", withAuth, (req, res) => {
    res.render("new-post", {
        layout: "dashboard",
        loggedIn: req.session.loggedIn
    });
});

// Route to render the edit post form for a specific post
router.get("/edit/:id", withAuth, (req, res) => {
    // Find the post by id
    Post.findByPk(req.params.id)
        .then(dbPostData => {
            if (dbPostData) {
                // If the post exists, render the edit-post template with the post data
                const post = dbPostData.get({ plain: true });
                res.render("edit-post", {
                    layout: "dashboard",
                    post,
                    loggedIn: req.session.loggedIn
                });
            } else {
                // If the post does not exist, return a 404 error
                res.status(404).end();
            }
        })
        .catch(err => {
            // If there is an error, return a 500 error with the error data
            res.status(500).json(err);
        });
});

// Export the router module
module.exports = router;
