const { StatusCodes } = require('http-status-codes');
const mongoose = require('mongoose'); // Import mongoose
const Service = require('../../../../model/admin/home/service.model');
const { logger } = require('../../../../config/logger');

exports.createService = async (req, res) => {
  try {
    logger.info('Creating a new service...');
    const {
      serviceTitle,
      url,
      shortDescription,
      description,
      displayOrder,
      status,
      image,
      isDisplay
    } = req.body;

    const newService = new Service({
      serviceTitle,
      url,
      shortDescription,
      description,
      displayOrder,
      status,
      image,
      isDisplay
    });

    await newService.save();

    logger.info('Service created successfully.');
    return res.status(StatusCodes.CREATED).send({
      status: 'Success',
      message: 'Service created successfully.',
      data: newService
    });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      logger.error('Service validation failed:', err.message);
      return res.status(StatusCodes.BAD_REQUEST).send({
        status: 'Validation failed',
        error: err.message
      });
    }
    logger.error('Error creating service:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: 'Creation failed',
      error: err.message || err
    });
  }
};

exports.getServices = async (req, res) => {
  try {
    logger.info('Fetching services with pagination and search...');

    const { page = 1, limit = 10, search = '' } = req.query;

    const query = {
      serviceTitle: { $regex: search, $options: 'i' }
    };

    const total = await Service.countDocuments(query);
    const services = await Service.find(query)
      .sort({ displayOrder: 1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    logger.info('Services fetched successfully with pagination.');
    return res.status(StatusCodes.OK).send({
      status: 'Success',
      total,
      page: Number(page),
      limit: Number(limit),
      data: services
    });
  } catch (err) {
    logger.error('Error fetching services:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: 'Fetch failed',
      error: err.message || err
    });
  }
};

exports.getServiceById = async (req, res) => {
  try {
    logger.info(`Fetching service with ID: ${req.params.id}...`);
    const service = await Service.findById(req.params.id);

    if (!service) {
      logger.warn('Service not found.');
      return res.status(StatusCodes.NOT_FOUND).send({
        status: 'Not found',
        error: 'Service not found'
      });
    }

    logger.info('Service fetched successfully.');
    return res.status(StatusCodes.OK).send({
      status: 'Success',
      data: service
    });
  } catch (err) {
    logger.error('Error fetching service by ID:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: 'Fetch failed',
      error: err.message || err
    });
  }
};

exports.updateService = async (req, res) => {
  try {
    logger.info(`Updating service with ID: ${req.params.id}...`);
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Added runValidators
    );

    if (!service) {
      logger.warn('Service not found for update.');
      return res.status(StatusCodes.NOT_FOUND).send({
        status: 'Not found',
        error: 'Service not found'
      });
    }

    logger.info('Service updated successfully.');
    return res.status(StatusCodes.OK).send({
      status: 'Success',
      message: 'Service updated successfully.',
      data: service
    });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      logger.error('Service validation failed:', err.message);
      return res.status(StatusCodes.BAD_REQUEST).send({
        status: 'Validation failed',
        error: err.message
      });
    }
    logger.error('Error updating service:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: 'Update failed',
      error: err.message || err
    });
  }
};

exports.deleteService = async (req, res) => {
  try {
    logger.info(`Deleting service with ID: ${req.params.id}...`);
    const deletedService = await Service.findByIdAndDelete(req.params.id);

    if (!deletedService) {
      logger.warn('Service not found for deletion.');
      return res.status(StatusCodes.NOT_FOUND).send({
        status: 'Not found',
        error: 'Service not found'
      });
    }

    logger.info('Service deleted successfully.');
    return res.status(StatusCodes.OK).send({
      status: 'Success',
      message: 'Service deleted successfully.'
    });
  } catch (err) {
    logger.error('Error deleting service:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: 'Deletion failed',
      error: err.message || err
    });
  }
};
