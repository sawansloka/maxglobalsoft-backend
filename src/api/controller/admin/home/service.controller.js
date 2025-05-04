const { StatusCodes } = require('http-status-codes');
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
    logger.error('Error creating service:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: 'Creation failed',
      error: err.message || err
    });
  }
};

exports.getServices = async (req, res) => {
  try {
    logger.info('Fetching all services...');
    const services = await Service.find().sort({ displayOrder: 1 });

    logger.info('Services fetched successfully.');
    return res.status(StatusCodes.OK).send({
      status: 'Success',
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
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

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
