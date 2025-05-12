const { StatusCodes } = require('http-status-codes');
const Application = require('../../../../model/admin/application/application.model');
const { logger } = require('../../../../config/logger');

exports.createApplication = async (req, res) => {
  try {
    logger.info('Creating new application...');
    const {
      jobId,
      jobType,
      applicantName,
      contactNumber,
      emailId,
      date,
      description,
      status,
      image
    } = req.body;

    const newApplication = new Application({
      jobId,
      jobType,
      applicantName,
      contactNumber,
      emailId,
      date,
      description,
      status,
      image
    });

    await newApplication.save();

    logger.info('Application created successfully.');
    return res.status(StatusCodes.CREATED).json({
      status: 'Success',
      message: 'Application created successfully.',
      data: newApplication
    });
  } catch (err) {
    logger.error('Error creating application:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'Creation failed',
      error: err.message || err
    });
  }
};

exports.getAllApplications = async (req, res) => {
  try {
    logger.info('Fetching all applications with search and pagination...');

    const { page = 1, limit = 10, search = '' } = req.query;

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const searchRegex = new RegExp(search, 'i');

    const query = {
      applicantName: { $regex: searchRegex }
    };

    const [applications, total] = await Promise.all([
      Application.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit, 10)),
      Application.countDocuments(query)
    ]);

    logger.info('Applications fetched successfully.');
    return res.status(StatusCodes.OK).json({
      status: 'Success',
      total,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      totalPages: Math.ceil(total / limit),
      data: applications
    });
  } catch (err) {
    logger.error('Error fetching applications:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'Fetch failed',
      error: err.message || err
    });
  }
};

exports.getApplicationById = async (req, res) => {
  try {
    logger.info(`Fetching application by ID: ${req.params.id}`);
    const application = await Application.findById(req.params.id);

    if (!application) {
      logger.warn('Application not found.');
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'Not found',
        error: 'Application not found'
      });
    }

    logger.info('Application fetched successfully.');
    return res.status(StatusCodes.OK).json({
      status: 'Success',
      data: application
    });
  } catch (err) {
    logger.error('Error fetching application by ID:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'Fetch failed',
      error: err.message || err
    });
  }
};

exports.updateApplication = async (req, res) => {
  try {
    logger.info(`Updating application by ID: ${req.params.id}`);
    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedApplication) {
      logger.warn('Application not found for update.');
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'Not found',
        error: 'Application not found'
      });
    }

    logger.info('Application updated successfully.');
    return res.status(StatusCodes.OK).json({
      status: 'Success',
      message: 'Application updated successfully.',
      data: updatedApplication
    });
  } catch (err) {
    logger.error('Error updating application:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'Update failed',
      error: err.message || err
    });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    logger.info(`Deleting application by ID: ${req.params.id}`);
    const deletedApplication = await Application.findByIdAndDelete(
      req.params.id
    );

    if (!deletedApplication) {
      logger.warn('Application not found for deletion.');
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'Not found',
        error: 'Application not found'
      });
    }

    logger.info('Application deleted successfully.');
    return res.status(StatusCodes.OK).json({
      status: 'Success',
      message: 'Application deleted successfully.'
    });
  } catch (err) {
    logger.error('Error deleting application:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'Deletion failed',
      error: err.message || err
    });
  }
};
