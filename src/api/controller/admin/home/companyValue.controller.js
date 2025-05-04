const { StatusCodes } = require('http-status-codes');
const CompanyValue = require('../../../../model/admin/home/companyValue.model');
const { logger } = require('../../../../config/logger');

exports.createCompanyValue = async (req, res) => {
  try {
    logger.info('Creating a new company value...');
    const { companyTitle, url, shortDescription, displayOrder, status, image } =
      req.body;

    const newCompanyValue = new CompanyValue({
      companyTitle,
      url,
      shortDescription,
      displayOrder,
      status,
      image
    });
    await newCompanyValue.save();

    logger.info('Company value created successfully.');
    return res.status(StatusCodes.CREATED).send({
      status: 'Success',
      message: 'Company value created successfully.',
      data: newCompanyValue
    });
  } catch (err) {
    logger.error('Error creating company value:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: 'Creation failed',
      error: err.message || err
    });
  }
};

exports.getCompanyValues = async (req, res) => {
  try {
    logger.info('Fetching all company values...');
    const companyValues = await CompanyValue.find().sort({ displayOrder: 1 });

    logger.info('Company values fetched successfully.');
    return res.status(StatusCodes.OK).send({
      status: 'Success',
      data: companyValues
    });
  } catch (err) {
    logger.error('Error fetching company values:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: 'Fetch failed',
      error: err.message || err
    });
  }
};

exports.getCompanyValueById = async (req, res) => {
  try {
    logger.info(`Fetching company value with ID: ${req.params.id}...`);
    const companyValue = await CompanyValue.findById(req.params.id);

    if (!companyValue) {
      logger.warn('Company value not found.');
      return res.status(StatusCodes.NOT_FOUND).send({
        status: 'Not found',
        error: 'Company value not found'
      });
    }

    logger.info('Company value fetched successfully.');
    return res.status(StatusCodes.OK).send({
      status: 'Success',
      data: companyValue
    });
  } catch (err) {
    logger.error('Error fetching company value by ID:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: 'Fetch failed',
      error: err.message || err
    });
  }
};

exports.updateCompanyValue = async (req, res) => {
  try {
    logger.info(`Updating company value with ID: ${req.params.id}...`);
    const companyValue = await CompanyValue.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!companyValue) {
      logger.warn('Company value not found for update.');
      return res.status(StatusCodes.NOT_FOUND).send({
        status: 'Not found',
        error: 'Company value not found'
      });
    }

    logger.info('Company value updated successfully.');
    return res.status(StatusCodes.OK).send({
      status: 'Success',
      message: 'Company value updated successfully.',
      data: companyValue
    });
  } catch (err) {
    logger.error('Error updating company value:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: 'Update failed',
      error: err.message || err
    });
  }
};

exports.deleteCompanyValue = async (req, res) => {
  try {
    logger.info(`Deleting company value with ID: ${req.params.id}...`);
    const deletedCompanyValue = await CompanyValue.findByIdAndDelete(
      req.params.id
    );

    if (!deletedCompanyValue) {
      logger.warn('Company value not found for deletion.');
      return res.status(StatusCodes.NOT_FOUND).send({
        status: 'Not found',
        error: 'Company value not found'
      });
    }

    logger.info('Company value deleted successfully.');
    return res.status(StatusCodes.OK).send({
      status: 'Success',
      message: 'Company value deleted successfully.'
    });
  } catch (err) {
    logger.error('Error deleting company value:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: 'Deletion failed',
      error: err.message || err
    });
  }
};
