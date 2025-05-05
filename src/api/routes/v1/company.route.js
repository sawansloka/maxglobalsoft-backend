const express = require('express');
const newsEventController = require('../../controller/admin/company/newsEvent.controller');
const clientSpeakController = require('../../controller/admin/company/clientSpeak.controller');
const careerController = require('../../controller/admin/company/career.controller');
const socialNetworkController = require('../../controller/admin/company/socialNetwork.controller');
const adminAuth = require('../../middleware/adminAuth');

const router = express.Router();

// news events routes
router
  .route('/news-events')
  .post(adminAuth, newsEventController.createNewsEvent)
  .get(adminAuth, newsEventController.getAllNewsEvents);

router
  .route('/news-events/:id')
  .get(adminAuth, newsEventController.getNewsEventById)
  .put(adminAuth, newsEventController.updateNewsEvent)
  .delete(adminAuth, newsEventController.deleteNewsEvent);

// client speak routes
router
  .route('/client-speak')
  .post(adminAuth, clientSpeakController.createClientSpeak)
  .get(adminAuth, clientSpeakController.getClientSpeaks);

router
  .route('/client-speak/:id')
  .get(adminAuth, clientSpeakController.getClientSpeaktById)
  .put(adminAuth, clientSpeakController.updateClientSpeak)
  .delete(adminAuth, clientSpeakController.deleteClientSpeak);

// career routes
router
  .route('/career')
  .post(adminAuth, careerController.createCareer)
  .get(adminAuth, careerController.getCareers);

router
  .route('/career/:id')
  .get(adminAuth, careerController.getCareerById)
  .put(adminAuth, careerController.updateCareer)
  .delete(adminAuth, careerController.deleteCareer);

// social networks routes
router
  .route('/social-network')
  .post(adminAuth, socialNetworkController.createSocialNetwork)
  .get(adminAuth, socialNetworkController.getSocialNetworks);

router
  .route('/social-network/:id')
  .get(adminAuth, socialNetworkController.getSocialNetworkById)
  .put(adminAuth, socialNetworkController.updateSocialNetwork)
  .delete(adminAuth, socialNetworkController.deleteSocialNetwork);

module.exports = router;
