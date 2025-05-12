const { StatusCodes } = require('http-status-codes');
const Page = require('../../../../model/admin/page/page.model');
const { logger } = require('../../../../config/logger');

exports.createPage = async (req, res) => {
  try {
    logger.info('Creating new page...');
    const newPage = new Page(req.body);
    await newPage.save();

    logger.info('Page created successfully.');
    return res.status(StatusCodes.CREATED).json({
      status: 'Success',
      message: 'Page created successfully.',
      data: newPage
    });
  } catch (err) {
    logger.error('Error creating page:', err.message);
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: 'Creation failed',
      error: err.message || err
    });
  }
};

exports.getAllPages = async (req, res) => {
  try {
    logger.info('Fetching all pages with search and pagination...');

    const { page = 1, limit = 10, search = '' } = req.query;

    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);
    const skip = (parsedPage - 1) * parsedLimit;
    const searchRegex = new RegExp(search, 'i');

    const query = {
      $or: [{ title: { $regex: searchRegex } }]
    };

    const [pages, total] = await Promise.all([
      Page.find(query).sort({ createdAt: -1 }).skip(skip).limit(parsedLimit),
      Page.countDocuments(query)
    ]);

    logger.info('Pages fetched successfully.');
    return res.status(StatusCodes.OK).json({
      status: 'Success',
      total,
      page: parsedPage,
      limit: parsedLimit,
      totalPages: Math.ceil(total / parsedLimit),
      data: pages
    });
  } catch (err) {
    logger.error('Error fetching pages:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'Fetch failed',
      error: err.message || err
    });
  }
};

exports.getPageById = async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);

    if (!page) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'Not Found',
        error: 'Page not found'
      });
    }

    return res.status(StatusCodes.OK).json({
      status: 'Success',
      data: page
    });
  } catch (err) {
    logger.error('Error fetching page by ID:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'Fetch failed',
      error: err.message || err
    });
  }
};

exports.updatePage = async (req, res) => {
  try {
    const updatedPage = await Page.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedPage) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'Not Found',
        error: 'Page not found'
      });
    }

    return res.status(StatusCodes.OK).json({
      status: 'Success',
      message: 'Page updated successfully.',
      data: updatedPage
    });
  } catch (err) {
    logger.error('Error updating page:', err.message);
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: 'Update failed',
      error: err.message || err
    });
  }
};

exports.deletePage = async (req, res) => {
  try {
    const deletedPage = await Page.findByIdAndDelete(req.params.id);

    if (!deletedPage) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'Not Found',
        error: 'Page not found'
      });
    }

    return res.status(StatusCodes.OK).json({
      status: 'Success',
      message: 'Page deleted successfully.'
    });
  } catch (err) {
    logger.error('Error deleting page:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'Deletion failed',
      error: err.message || err
    });
  }
};
