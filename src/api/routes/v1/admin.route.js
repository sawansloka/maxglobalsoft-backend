const express = require('express');
const adminController = require('../../controller/admin/admin.controller');
const homeRoutes = require('./home.route');
const companyRoutes = require('./company.route');
const applicationRoutes = require('./application.route');
const portfolioRoutes = require('./portfolio.route');
const pageRoutes = require('./page.route');
const partnerRoutes = require('./partner.route');
const adminAuth = require('../../middleware/adminAuth');

const router = express.Router();

// Admin
router.route('/login').post(adminController.login);
router.route('/logout').post(adminAuth, adminController.logout);

router.use('/v1/home', homeRoutes);
router.use('/v1/company', companyRoutes);
router.use('/v1/application', applicationRoutes);
router.use('/v1/page', pageRoutes);
router.use('/v1/partner', partnerRoutes);
router.use('/v1/portfolio', portfolioRoutes);

module.exports = router;
