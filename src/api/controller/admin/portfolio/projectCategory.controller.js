const { StatusCodes } = require('http-status-codes');
const ProjectCategory = require('../../../../model/admin/portfolio/projectCategory.model');
const { logger } = require('../../../../config/logger');

exports.createProjectCategory = async (req, res) => {
  try {
    logger.info('Creating new Project Category...');
    const { parentPhotpholio, name, status } = req.body;

    const newCategory = new ProjectCategory({
      parentPhotpholio,
      name,
      status
    });

    await newCategory.save();

    logger.info('Project Category created successfully.');
    return res.status(StatusCodes.CREATED).json({
      status: 'Success',
      message: 'Project Category created successfully.',
      data: newCategory
    });
  } catch (err) {
    logger.error('Error creating Project Category:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'Creation failed',
      error: err.message || err
    });
  }
};

exports.getAllProjectCategories = async (req, res) => {
  try {
    logger.info(
      'Fetching all Project Categories with search and pagination...'
    );

    const { page = 1, limit = 10, search = '' } = req.query;

    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);
    const skip = (parsedPage - 1) * parsedLimit;
    const searchRegex = new RegExp(search, 'i');

    const query = {
      $or: [{ name: { $regex: searchRegex } }]
    };

    const [categories, total] = await Promise.all([
      ProjectCategory.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parsedLimit),
      ProjectCategory.countDocuments(query)
    ]);

    logger.info('Project Categories fetched successfully.');
    return res.status(StatusCodes.OK).json({
      status: 'Success',
      total,
      page: parsedPage,
      limit: parsedLimit,
      totalPages: Math.ceil(total / parsedLimit),
      data: categories
    });
  } catch (err) {
    logger.error('Error fetching Project Categories:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'Fetch failed',
      error: err.message || err
    });
  }
};

exports.getProjectCategoryById = async (req, res) => {
  try {
    logger.info(`Fetching Project Category by ID: ${req.params.id}`);
    const category = await ProjectCategory.findById(req.params.id);

    if (!category) {
      logger.warn('Project Category not found.');
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'Not found',
        error: 'Project Category not found'
      });
    }

    logger.info('Project Category fetched successfully.');
    return res.status(StatusCodes.OK).json({
      status: 'Success',
      data: category
    });
  } catch (err) {
    logger.error('Error fetching Project Category by ID:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'Fetch failed',
      error: err.message || err
    });
  }
};

exports.updateProjectCategory = async (req, res) => {
  try {
    logger.info(`Updating Project Category by ID: ${req.params.id}`);
    const updatedCategory = await ProjectCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedCategory) {
      logger.warn('Project Category not found for update.');
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'Not found',
        error: 'Project Category not found'
      });
    }

    logger.info('Project Category updated successfully.');
    return res.status(StatusCodes.OK).json({
      status: 'Success',
      message: 'Project Category updated successfully.',
      data: updatedCategory
    });
  } catch (err) {
    logger.error('Error updating Project Category:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'Update failed',
      error: err.message || err
    });
  }
};

exports.deleteProjectCategory = async (req, res) => {
  try {
    logger.info(`Deleting Project Category by ID: ${req.params.id}`);
    const deletedCategory = await ProjectCategory.findByIdAndDelete(
      req.params.id
    );

    if (!deletedCategory) {
      logger.warn('Project Category not found for deletion.');
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'Not found',
        error: 'Project Category not found'
      });
    }

    logger.info('Project Category deleted successfully.');
    return res.status(StatusCodes.OK).json({
      status: 'Success',
      message: 'Project Category deleted successfully.'
    });
  } catch (err) {
    logger.error('Error deleting Project Category:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'Deletion failed',
      error: err.message || err
    });
  }
};
