const express = require('express');

const router = express.Router();
const adminAuth = require('../../middleware/adminAuth');
const applicationController = require('../../controller/admin/application/application.controller');

// Application routes
router
  .route('/application')
  .post(adminAuth, applicationController.createApplication)
  .get(adminAuth, applicationController.getAllApplications);

router
  .route('/application/:id')
  .get(adminAuth, applicationController.getApplicationById)
  .put(adminAuth, applicationController.updateApplication)
  .delete(adminAuth, applicationController.deleteApplication);

module.exports = router;
