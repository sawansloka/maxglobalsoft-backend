const { StatusCodes } = require('http-status-codes');
const Career = require('../../../../model/admin/company/career.model');
const { logger } = require('../../../../config/logger');

exports.createCareer = async (req, res) => {
  try {
    logger.info('Creating new Career entry...');
    const {
      jobTypes,
      totalExp,
      location,
      date,
      shortDescription,
      description,
      status,
      image
    } = req.body;

    const newCareer = new Career({
      jobTypes,
      totalExp,
      location,
      date,
      shortDescription,
      description,
      status,
      image
    });

    await newCareer.save();

    logger.info('Career entry created successfully.');
    return res.status(StatusCodes.CREATED).json({
      status: 'Success',
      message: 'Career entry created successfully.',
      data: newCareer
    });
  } catch (err) {
    logger.error('Error creating Career entry:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'Creation failed',
      error: err.message || err
    });
  }
};

exports.getCareers = async (req, res) => {
  try {
    logger.info('Fetching all Career entries...');
    const careers = await Career.find().sort({ createdAt: -1 });

    logger.info('Career entries fetched successfully.');
    return res.status(StatusCodes.OK).json({
      status: 'Success',
      data: careers
    });
  } catch (err) {
    logger.error('Error fetching Career entries:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'Fetch failed',
      error: err.message || err
    });
  }
};

exports.getCareerById = async (req, res) => {
  try {
    logger.info(`Fetching Career entry by ID: ${req.params.id}`);
    const career = await Career.findById(req.params.id);

    if (!career) {
      logger.warn('Career entry not found.');
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'Not found',
        error: 'Career entry not found'
      });
    }

    logger.info('Career entry fetched successfully.');
    return res.status(StatusCodes.OK).json({
      status: 'Success',
      data: career
    });
  } catch (err) {
    logger.error('Error fetching Career by ID:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'Fetch failed',
      error: err.message || err
    });
  }
};

exports.updateCareer = async (req, res) => {
  try {
    logger.info(`Updating Career entry by ID: ${req.params.id}`);
    const updatedCareer = await Career.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedCareer) {
      logger.warn('Career entry not found for update.');
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'Not found',
        error: 'Career entry not found'
      });
    }

    logger.info('Career entry updated successfully.');
    return res.status(StatusCodes.OK).json({
      status: 'Success',
      message: 'Career entry updated successfully.',
      data: updatedCareer
    });
  } catch (err) {
    logger.error('Error updating Career entry:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'Update failed',
      error: err.message || err
    });
  }
};

exports.deleteCareer = async (req, res) => {
  try {
    logger.info(`Deleting Career entry by ID: ${req.params.id}`);
    const deletedCareer = await Career.findByIdAndDelete(req.params.id);

    if (!deletedCareer) {
      logger.warn('Career entry not found for deletion.');
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'Not found',
        error: 'Career entry not found'
      });
    }

    logger.info('Career entry deleted successfully.');
    return res.status(StatusCodes.OK).json({
      status: 'Success',
      message: 'Career entry deleted successfully.'
    });
  } catch (err) {
    logger.error('Error deleting Career entry:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'Deletion failed',
      error: err.message || err
    });
  }
};
