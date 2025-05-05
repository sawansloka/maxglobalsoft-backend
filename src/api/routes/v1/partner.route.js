const express = require('express');

const router = express.Router();
const adminAuth = require('../../middleware/adminAuth');
const clientController = require('../../controller/admin/partner/client.controller');
const partnerController = require('../../controller/admin/partner/partner.controller');

// Client routes
router
  .route('/client')
  .post(adminAuth, clientController.createClient)
  .get(adminAuth, clientController.getAllClients);

router
  .route('/client/:id')
  .get(adminAuth, clientController.getClientById)
  .put(adminAuth, clientController.updateClient)
  .delete(adminAuth, clientController.deleteClient);

// Partner routes
router
  .route('/partner')
  .post(adminAuth, partnerController.createPartner)
  .get(adminAuth, partnerController.getAllPartners);

router
  .route('/partner/:id')
  .get(adminAuth, partnerController.getPartnerById)
  .put(adminAuth, partnerController.updatePartner)
  .delete(adminAuth, partnerController.deletePartner);

module.exports = router;
