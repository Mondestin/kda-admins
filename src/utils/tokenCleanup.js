const cron = require('node-cron');
const { cleanupExpiredTokens } = require('../controllers/admin/authController');

// Run cleanup every day at midnight
cron.schedule('0 0 * * *', async () => {
  await cleanupExpiredTokens();
}); 