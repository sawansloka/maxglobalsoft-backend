const express = require('express');
const newsEventController = require('../../controller/admin/company/newsEvents.controller');
const adminAuth = require('../../middleware/adminAuth');

const router = express.Router();

// news events routes
router
  .route('/news-events/')
  .post(adminAuth, newsEventController.createNewsEvent)
  .get(adminAuth, newsEventController.getAllNewsEvents);

router
  .route('/news-events/:id')
  .get(adminAuth, newsEventController.getNewsEventById)
  .put(adminAuth, newsEventController.updateNewsEvent)
  .delete(adminAuth, newsEventController.deleteNewsEvent);

module.exports = router;
