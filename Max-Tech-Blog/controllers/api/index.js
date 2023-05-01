// Import the Express router module
const router = require('express').Router();

// Import routes modules
const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes.js');
const commentRoutes = require('./comment-routes.js');

// Register the user routes with the router under the '/user' endpoint
router.use('/user', userRoutes);
// Register the post routes with the router under the '/post' endpoint
router.use('/post', postRoutes);
// Register the comment routes with the router under the '/comment' endpoint
router.use('/comment', commentRoutes);

// Export the router to be used in other parts of the application
module.exports= router;