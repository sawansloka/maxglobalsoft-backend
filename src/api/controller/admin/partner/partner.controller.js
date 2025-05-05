const { StatusCodes } = require('http-status-codes');
const Partners = require('../../../../model/admin/partner/partner.model');
const { logger } = require('../../../../config/logger');

// Create a new partner
exports.createPartner = async (req, res) => {
  try {
    logger.info('Creating new partner...');
    const { title, url, shortDescription, displayOrder, status, image } =
      req.body;

    const newPartner = new Partners({
      title,
      url,
      shortDescription,
      displayOrder,
      status,
      image
    });

    await newPartner.save();

    logger.info('Partner created successfully.');
    return res.status(StatusCodes.CREATED).json({
      status: 'Success',
      message: 'Partner created successfully.',
      data: newPartner
    });
  } catch (err) {
    logger.error('Error creating partner:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'Creation failed',
      error: err.message || err
    });
  }
};

// Get all partners
exports.getAllPartners = async (req, res) => {
  try {
    logger.info('Fetching all partners...');
    const partners = await Partners.find().sort({ displayOrder: 1 });

    logger.info('Partners fetched successfully.');
    return res.status(StatusCodes.OK).json({
      status: 'Success',
      data: partners
    });
  } catch (err) {
    logger.error('Error fetching partners:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'Fetch failed',
      error: err.message || err
    });
  }
};

// Get partner by ID
exports.getPartnerById = async (req, res) => {
  try {
    logger.info(`Fetching partner by ID: ${req.params.id}`);
    const partner = await Partners.findById(req.params.id);

    if (!partner) {
      logger.warn('Partner not found.');
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'Not found',
        error: 'Partner not found'
      });
    }

    logger.info('Partner fetched successfully.');
    return res.status(StatusCodes.OK).json({
      status: 'Success',
      data: partner
    });
  } catch (err) {
    logger.error('Error fetching partner by ID:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'Fetch failed',
      error: err.message || err
    });
  }
};

// Update partner by ID
exports.updatePartner = async (req, res) => {
  try {
    logger.info(`Updating partner by ID: ${req.params.id}`);
    const updatedPartner = await Partners.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedPartner) {
      logger.warn('Partner not found for update.');
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'Not found',
        error: 'Partner not found'
      });
    }

    logger.info('Partner updated successfully.');
    return res.status(StatusCodes.OK).json({
      status: 'Success',
      message: 'Partner updated successfully.',
      data: updatedPartner
    });
  } catch (err) {
    logger.error('Error updating partner:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'Update failed',
      error: err.message || err
    });
  }
};

// Delete partner by ID
exports.deletePartner = async (req, res) => {
  try {
    logger.info(`Deleting partner by ID: ${req.params.id}`);
    const deletedPartner = await Partners.findByIdAndDelete(req.params.id);

    if (!deletedPartner) {
      logger.warn('Partner not found for deletion.');
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'Not found',
        error: 'Partner not found'
      });
    }

    logger.info('Partner deleted successfully.');
    return res.status(StatusCodes.OK).json({
      status: 'Success',
      message: 'Partner deleted successfully.'
    });
  } catch (err) {
    logger.error('Error deleting partner:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'Deletion failed',
      error: err.message || err
    });
  }
};
