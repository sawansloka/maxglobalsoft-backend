const express = require('express');
const bannerController = require('../../controller/admin/home/banner.controller');
const companyValueController = require('../../controller/admin/home/companyValue.controller');
const serviceController = require('../../controller/admin/home/service.controller');
const subscriptionController = require('../../controller/admin/home/subscription.controller');
const adminAuth = require('../../middleware/adminAuth');

const router = express.Router();

// banner routes
router
  .route('/banner/')
  .post(adminAuth, bannerController.createBanner)
  .get(adminAuth, bannerController.getBanners);

router
  .route('/banner/:id')
  .get(adminAuth, bannerController.getBannerById)
  .put(adminAuth, bannerController.updateBanner)
  .delete(adminAuth, bannerController.deleteBanner);

// Company Value routes
router
  .route('/company-values/')
  .post(adminAuth, companyValueController.createCompanyValue)
  .get(adminAuth, companyValueController.getCompanyValues);

router
  .route('/company-values/:id')
  .get(adminAuth, companyValueController.getCompanyValueById)
  .put(adminAuth, companyValueController.updateCompanyValue)
  .delete(adminAuth, companyValueController.deleteCompanyValue);

// service routes
router
  .route('/service/')
  .post(adminAuth, serviceController.createService)
  .get(adminAuth, serviceController.getServices);

router
  .route('/service/:id')
  .get(adminAuth, serviceController.getServiceById)
  .put(adminAuth, serviceController.updateService)
  .delete(adminAuth, serviceController.deleteService);

// subscription routes
router
  .route('/subscription/')
  .post(adminAuth, subscriptionController.createSubscription)
  .get(adminAuth, subscriptionController.getSubscriptions);

router
  .route('/subscription/:id')
  .get(adminAuth, subscriptionController.getSubscriptionById)
  .put(adminAuth, subscriptionController.updateSubscription)
  .delete(adminAuth, subscriptionController.deleteSubscription);

module.exports = router;
