
// Require the express Router module and assign it to the variable 'router'
const router = require('express').Router();

// Require the routes for the different parts of the application and assign them to variables
const apiRoutes = require('./api'); // API routes
const homeRoutes = require('./home-routes.js'); // Home page routes
const dashboardRoutes = require('./dashboard-routes.js'); // Dashboard page routes

// Mount the different route files on the router, specifying the URL path for each
router.use('/', homeRoutes); // Mount the home page routes at the root URL path
router.use('/dashboard', dashboardRoutes); // Mount the dashboard page routes at the '/dashboard' URL path
router.use('/api', apiRoutes); // Mount the API routes at the '/api' URL path

// Export the router module for use in other files
module.exports= router;
