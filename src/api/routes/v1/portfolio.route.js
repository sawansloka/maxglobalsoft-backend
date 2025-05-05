const express = require('express');

const router = express.Router();
const adminAuth = require('../../middleware/adminAuth');
const projectsController = require('../../controller/admin/portfolio/projects.controller');
const projectCategoryController = require('../../controller/admin/portfolio/projectCategory.controller');

// Project routes
router
  .route('/projects')
  .post(adminAuth, projectsController.createProject)
  .get(adminAuth, projectsController.getAllProjects);

router
  .route('/projects/:id')
  .get(adminAuth, projectsController.getProjectById)
  .put(adminAuth, projectsController.updateProject)
  .delete(adminAuth, projectsController.deleteProject);

// Project Category routes
router
  .route('/project-category')
  .post(adminAuth, projectCategoryController.createProjectCategory)
  .get(adminAuth, projectCategoryController.getAllProjectCategories);

router
  .route('/project-category/:id')
  .get(adminAuth, projectCategoryController.getProjectCategoryById)
  .put(adminAuth, projectCategoryController.updateProjectCategory)
  .delete(adminAuth, projectCategoryController.deleteProjectCategory);

module.exports = router;
