const express = require('express');
const adminController = require('../../controller/admin/admin.controller');
const homeRoutes = require('./home.route');
const companyRoutes = require('./company.route');

const router = express.Router();

// Admin
router.route('/login').post(adminController.login);

router.use('/v1/home', homeRoutes);
router.use('/v1/company', companyRoutes);
// router.use('/v1', publicRoutes);

module.exports = router;
