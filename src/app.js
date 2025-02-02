require('dotenv').config(); 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('./utils/logger'); // Custom logger
const errorHandler = require('./middlewares/errorHandler'); // Centralized error handling

// Route imports
const adminRoutes = require('./routes/adminRoutes');
const commonRoutes = require('./routes/commonRoutes');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(helmet()); // Secure HTTP headers
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data

// Log every request
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Routes setup
app.use('/api/v1/kda/admin', adminRoutes); // Admin-specific routes
app.use('/api/v1/kda/admin', commonRoutes); // Shared/common routes

// Centralized error handler
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  logger.info(`KDA ADMINS Server running on port ${PORT}`);
});

module.exports = app;
