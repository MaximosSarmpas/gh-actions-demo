// This code defines a router object and requires the necessary models and dependencies.
const router = require('express').Router();
const { Post, Comment, User } = require("../models");

// When the root URL path is requested, all the posts are fetched from the database along with their associated users.
router.get("/", (req, res) => {
    Post.findAll({
        include: [User],
    })
        .then((dbPostData) => {
            // The fetched data is then transformed into a plain object and passed to the view template engine along with the logged-in status of the user.
            const posts = dbPostData.map((post) => post.get({ plain: true }));
            res.render("all-posts",  { posts, loggedIn: req.session.loggedIn });
        })
        .catch((err) => {
            // If any error occurs, a 500 status code is sent as a response.
            res.status(500).json(err);
        });
});

// When a specific post ID is requested, the corresponding post and its associated user and comments are fetched from the database.
router.get("/post/:id", (req, res) => {
    Post.findByPk(req.params.id, {
        include: [
            User,
            {
                model: Comment,
                include: [User],
                loggedIn: req.session.loggedIn
            },
        ],
    })
        .then((dbPostData) => {
            // If the requested post exists, it is transformed into a plain object and passed to the view template engine along with the logged-in status of the user.
            if (dbPostData) {
                const post = dbPostData.get({ plain: true });
                res.render("single-post", { post, loggedIn: req.session.loggedIn });
            } else {
                // If the requested post doesn't exist, a 404 status code is sent as a response.
                res.status(404).end();
            }
        })
        .catch((err) => {
            // If any error occurs, a 500 status code is sent as a response.
            res.status(500).json(err);
        });
});

// When the login URL path is requested, the login view template is rendered.
router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        // If the user is already logged in, they are redirected to the root URL path.
        res.redirect("/");
        return;
    }

    res.render("login");
});

// When the signup URL path is requested, the signup view template is rendered.
router.get("/signup", (req, res) => {
    if (req.session.loggedIn) {
        // If the user is already logged in, they are redirected to the root URL path.
        res.redirect("/");
        return;
    }

    res.render("signup");
});

// The router object is exported to be used by other modules.
module.exports = router;
