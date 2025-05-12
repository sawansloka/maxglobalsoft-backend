const { StatusCodes } = require('http-status-codes');
const SocialNetwork = require('../../../../model/admin/company/socialNetwork.model');
const { logger } = require('../../../../config/logger');

exports.createSocialNetwork = async (req, res) => {
  try {
    logger.info('Attempting to create Social Network entry...');
    const existing = await SocialNetwork.findOne();

    if (existing) {
      logger.warn('Social Network entry already exists. Creation aborted.');
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'Failed',
        message:
          'Social Network already exists. Please use the update endpoint.'
      });
    }

    const newEntry = new SocialNetwork(req.body);
    await newEntry.save();

    logger.info('Social Network entry created successfully.');
    return res.status(StatusCodes.CREATED).json({
      status: 'Success',
      message: 'Social Network entry created successfully.',
      data: newEntry
    });
  } catch (err) {
    logger.error('Error creating Social Network entry:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'Creation failed',
      error: err.message || err
    });
  }
};

exports.getSocialNetwork = async (req, res) => {
  try {
    logger.info('Fetching Social Network entry with optional search...');

    const { search = '' } = req.query;
    const searchRegex = new RegExp(search, 'i');

    const query = {
      $or: [
        { facebook: { $regex: searchRegex } },
        { instagram: { $regex: searchRegex } },
        { twitter: { $regex: searchRegex } },
        { linkedin: { $regex: searchRegex } },
        { youtube: { $regex: searchRegex } }
      ]
    };

    const data = search
      ? await SocialNetwork.findOne(query)
      : await SocialNetwork.findOne();

    return res.status(StatusCodes.OK).json({
      status: 'Success',
      data: data || {}
    });
  } catch (err) {
    logger.error('Error fetching Social Network entry:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'Fetch failed',
      error: err.message || err
    });
  }
};

exports.getSocialNetworkById = async (req, res) => {
  try {
    logger.info(`Fetching Social Network entry by ID: ${req.params.id}`);
    const entry = await SocialNetwork.findById(req.params.id);

    if (!entry) {
      logger.warn('Social Network entry not found.');
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'Not found',
        error: 'Social Network entry not found'
      });
    }

    return res.status(StatusCodes.OK).json({
      status: 'Success',
      data: entry
    });
  } catch (err) {
    logger.error('Error fetching Social Network by ID:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'Fetch failed',
      error: err.message || err
    });
  }
};

exports.updateSocialNetwork = async (req, res) => {
  try {
    logger.info('Attempting to update Social Network entry...');
    const existing = await SocialNetwork.findOne();

    if (!existing) {
      logger.warn('No Social Network entry found to update.');
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'Not found',
        error: 'Social Network entry not found. Please create it first.'
      });
    }

    const updated = await SocialNetwork.findByIdAndUpdate(
      existing._id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    logger.info('Social Network entry updated successfully.');
    return res.status(StatusCodes.OK).json({
      status: 'Success',
      message: 'Social Network entry updated successfully.',
      data: updated
    });
  } catch (err) {
    logger.error('Error updating Social Network entry:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'Update failed',
      error: err.message || err
    });
  }
};

exports.deleteSocialNetwork = async (req, res) => {
  try {
    logger.info(
      `Attempting to delete Social Network entry by ID: ${req.params.id}`
    );
    const deleted = await SocialNetwork.findByIdAndDelete(req.params.id);

    if (!deleted) {
      logger.warn('Social Network entry not found for deletion.');
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'Not found',
        error: 'Social Network entry not found'
      });
    }

    logger.info('Social Network entry deleted successfully.');
    return res.status(StatusCodes.OK).json({
      status: 'Success',
      message: 'Social Network entry deleted successfully.'
    });
  } catch (err) {
    logger.error('Error deleting Social Network entry:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'Deletion failed',
      error: err.message || err
    });
  }
};
