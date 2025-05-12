const { StatusCodes } = require('http-status-codes');
const Menu = require('../../../../model/admin/page/menu.model');
const { logger } = require('../../../../config/logger');

exports.createMenu = async (req, res) => {
  try {
    logger.info('Creating new menu...');
    const { name, status } = req.body;

    const newMenu = new Menu({
      name,
      status
    });

    await newMenu.save();

    logger.info('Menu created successfully.');
    return res.status(StatusCodes.CREATED).json({
      status: 'Success',
      message: 'Menu created successfully.',
      data: newMenu
    });
  } catch (err) {
    logger.error('Error creating menu:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'Creation failed',
      error: err.message || err
    });
  }
};

exports.getAllMenus = async (req, res) => {
  try {
    logger.info('Fetching all menus with search and pagination...');

    const { page = 1, limit = 10, search = '' } = req.query;

    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);
    const skip = (parsedPage - 1) * parsedLimit;
    const searchRegex = new RegExp(search, 'i');

    const query = {
      $or: [{ name: { $regex: searchRegex } }]
    };

    const [menus, total] = await Promise.all([
      Menu.find(query).sort({ createdAt: -1 }).skip(skip).limit(parsedLimit),
      Menu.countDocuments(query)
    ]);

    logger.info('Menus fetched successfully.');
    return res.status(StatusCodes.OK).json({
      status: 'Success',
      total,
      page: parsedPage,
      limit: parsedLimit,
      totalPages: Math.ceil(total / parsedLimit),
      data: menus
    });
  } catch (err) {
    logger.error('Error fetching menus:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'Fetch failed',
      error: err.message || err
    });
  }
};

exports.getMenuById = async (req, res) => {
  try {
    logger.info(`Fetching menu by ID: ${req.params.id}`);
    const menu = await Menu.findById(req.params.id);

    if (!menu) {
      logger.warn('Menu not found.');
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'Not found',
        error: 'Menu not found'
      });
    }

    logger.info('Menu fetched successfully.');
    return res.status(StatusCodes.OK).json({
      status: 'Success',
      data: menu
    });
  } catch (err) {
    logger.error('Error fetching menu by ID:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'Fetch failed',
      error: err.message || err
    });
  }
};

exports.updateMenu = async (req, res) => {
  try {
    logger.info(`Updating menu by ID: ${req.params.id}`);
    const updatedMenu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedMenu) {
      logger.warn('Menu not found for update.');
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'Not found',
        error: 'Menu not found'
      });
    }

    logger.info('Menu updated successfully.');
    return res.status(StatusCodes.OK).json({
      status: 'Success',
      message: 'Menu updated successfully.',
      data: updatedMenu
    });
  } catch (err) {
    logger.error('Error updating menu:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'Update failed',
      error: err.message || err
    });
  }
};

exports.deleteMenu = async (req, res) => {
  try {
    logger.info(`Deleting menu by ID: ${req.params.id}`);
    const deletedMenu = await Menu.findByIdAndDelete(req.params.id);

    if (!deletedMenu) {
      logger.warn('Menu not found for deletion.');
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'Not found',
        error: 'Menu not found'
      });
    }

    logger.info('Menu deleted successfully.');
    return res.status(StatusCodes.OK).json({
      status: 'Success',
      message: 'Menu deleted successfully.'
    });
  } catch (err) {
    logger.error('Error deleting menu:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'Deletion failed',
      error: err.message || err
    });
  }
};
