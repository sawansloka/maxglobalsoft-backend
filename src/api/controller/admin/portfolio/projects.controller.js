const { StatusCodes } = require('http-status-codes');
const Projects = require('../../../../model/admin/portfolio/projects.model');
const { logger } = require('../../../../config/logger');

exports.createProject = async (req, res) => {
  try {
    logger.info('Creating new Project entry...');
    const project = new Projects(req.body);
    await project.save();

    logger.info('Project created successfully.');
    return res.status(StatusCodes.CREATED).json({
      status: 'Success',
      message: 'Project created successfully.',
      data: project
    });
  } catch (err) {
    logger.error('Error creating project:', err.message);
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: 'Creation failed',
      error: err.message || err
    });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    logger.info('Fetching all Project entries...');
    const projects = await Projects.find().sort({ displayOrder: 1 });

    logger.info('Projects fetched successfully.');
    return res.status(StatusCodes.OK).json({
      status: 'Success',
      data: projects
    });
  } catch (err) {
    logger.error('Error fetching projects:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'Fetch failed',
      error: err.message || err
    });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    logger.info(`Fetching project with ID: ${req.params.id}`);
    const project = await Projects.findById(req.params.id);

    if (!project) {
      logger.warn('Project not found.');
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'Not found',
        error: 'Project not found'
      });
    }

    logger.info('Project fetched successfully.');
    return res.status(StatusCodes.OK).json({
      status: 'Success',
      data: project
    });
  } catch (err) {
    logger.error('Error fetching project by ID:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'Fetch failed',
      error: err.message || err
    });
  }
};

exports.updateProject = async (req, res) => {
  try {
    logger.info(`Updating project with ID: ${req.params.id}`);
    const updatedProject = await Projects.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      logger.warn('Project not found for update.');
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'Not found',
        error: 'Project not found'
      });
    }

    logger.info('Project updated successfully.');
    return res.status(StatusCodes.OK).json({
      status: 'Success',
      message: 'Project updated successfully.',
      data: updatedProject
    });
  } catch (err) {
    logger.error('Error updating project:', err.message);
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: 'Update failed',
      error: err.message || err
    });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    logger.info(`Deleting project with ID: ${req.params.id}`);
    const deletedProject = await Projects.findByIdAndDelete(req.params.id);

    if (!deletedProject) {
      logger.warn('Project not found for deletion.');
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'Not found',
        error: 'Project not found'
      });
    }

    logger.info('Project deleted successfully.');
    return res.status(StatusCodes.OK).json({
      status: 'Success',
      message: 'Project deleted successfully.'
    });
  } catch (err) {
    logger.error('Error deleting project:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'Deletion failed',
      error: err.message || err
    });
  }
};
