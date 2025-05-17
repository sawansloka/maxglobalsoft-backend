const { StatusCodes } = require('http-status-codes');
const mongoose = require('mongoose'); // Import mongoose here
const Banner = require('../../../../model/admin/home/banner.model');
const { logger } = require('../../../../config/logger');

exports.createBanner = async (req, res) => {
  try {
    logger.info('Creating a new banner...');
    const { bannerTitle, url, shortDescription, displayOrder, status, image } =
      req.body;

    const newBanner = new Banner({
      bannerTitle,
      url,
      shortDescription,
      displayOrder,
      status,
      image
    });
    await newBanner.save();

    logger.info('Banner created successfully.');
    return res.status(StatusCodes.CREATED).send({
      status: 'Success',
      message: 'Banner created successfully.',
      data: newBanner
    });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      logger.error('Banner validation failed:', err.message);
      return res.status(StatusCodes.BAD_REQUEST).send({
        status: 'Validation failed',
        error: err.message
      });
    }
    logger.error('Error creating banner:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: 'Creation failed',
      error: err.message || err
    });
  }
};

exports.getBanners = async (req, res) => {
  try {
    logger.info('Fetching banners with pagination and search...');

    const { page = 1, limit = 10, search = '' } = req.query;

    const query = {
      bannerTitle: { $regex: search, $options: 'i' }
    };

    const total = await Banner.countDocuments(query);
    const banners = await Banner.find(query)
      .sort({ displayOrder: 1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    logger.info('Banners fetched successfully with pagination and search.');
    return res.status(StatusCodes.OK).send({
      status: 'Success',
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      totalRecords: total,
      data: banners
    });
  } catch (err) {
    logger.error('Error fetching banners:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: 'Fetch failed',
      error: err.message || err
    });
  }
};

exports.getBannerById = async (req, res) => {
  try {
    logger.info(`Fetching banner with ID: ${req.params.id}...`);
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      logger.warn('Banner not found.');
      return res.status(StatusCodes.NOT_FOUND).send({
        status: 'Not found',
        error: 'Banner not found'
      });
    }

    logger.info('Banner fetched successfully.');
    return res.status(StatusCodes.OK).send({
      status: 'Success',
      data: banner
    });
  } catch (err) {
    logger.error('Error fetching banner by ID:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: 'Fetch failed',
      error: err.message || err
    });
  }
};

exports.updateBanner = async (req, res) => {
  try {
    logger.info(`Updating banner with ID: ${req.params.id}...`);
    const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true // Add this option to trigger validation
    });

    if (!banner) {
      logger.warn('Banner not found for update.');
      return res.status(StatusCodes.NOT_FOUND).send({
        status: 'Not found',
        error: 'Banner not found'
      });
    }

    logger.info('Banner updated successfully.');
    return res.status(StatusCodes.OK).send({
      status: 'Success',
      message: 'Banner updated successfully.',
      data: banner
    });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      logger.error('Banner validation failed:', err.message);
      return res.status(StatusCodes.BAD_REQUEST).send({
        status: 'Validation failed',
        error: err.message
      });
    }
    logger.error('Error updating banner:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: 'Update failed',
      error: err.message || err
    });
  }
};

exports.deleteBanner = async (req, res) => {
  try {
    logger.info(`Deleting banner with ID: ${req.params.id}...`);
    const deletedBanner = await Banner.findByIdAndDelete(req.params.id);

    if (!deletedBanner) {
      logger.warn('Banner not found for deletion.');
      return res.status(StatusCodes.NOT_FOUND).send({
        status: 'Not found',
        error: 'Banner not found'
      });
    }

    logger.info('Banner deleted successfully.');
    return res.status(StatusCodes.OK).send({
      status: 'Success',
      message: 'Banner deleted successfully.'
    });
  } catch (err) {
    logger.error('Error deleting banner:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: 'Deletion failed',
      error: err.message || err
    });
  }
};
