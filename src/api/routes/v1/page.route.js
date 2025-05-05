const express = require('express');

const router = express.Router();
const adminAuth = require('../../middleware/adminAuth');
const menuController = require('../../controller/admin/page/menu.controller');
const pageController = require('../../controller/admin/page/page.controller');

// Menu routes
router
  .route('/menu')
  .post(adminAuth, menuController.createMenu)
  .get(adminAuth, menuController.getAllMenus);

router
  .route('/menu/:id')
  .get(adminAuth, menuController.getMenuById)
  .put(adminAuth, menuController.updateMenu)
  .delete(adminAuth, menuController.deleteMenu);

// Page routes
router
  .route('/page')
  .post(adminAuth, pageController.createPage)
  .get(adminAuth, pageController.getAllPages);

router
  .route('/page/:id')
  .get(adminAuth, pageController.getPageById)
  .put(adminAuth, pageController.updatePage)
  .delete(adminAuth, pageController.deletePage);

module.exports = router;
