// admin.controller.js
const { StatusCodes } = require('http-status-codes');
const Admin = require('../../../model/admin/admin.model');
const { logger } = require('../../../config/logger');

exports.login = async (req, res) => {
  try {
    logger.info('Starting login function...');
    const { username, password } = req.body;

    if (!username || !password) {
      logger.warn('Validation failed: Missing username or password.');
      return res.status(StatusCodes.BAD_REQUEST).send({
        status: 'Error',
        message: 'Please provide username and password'
      });
    }

    logger.info(`Authenticating admin with username: ${username}`);
    const admin = await Admin.findByCredentials(username, password);

    logger.info('Generating JWT for admin...');
    const token = await admin.generateAuthToken();

    logger.info('Admin login successful.');
    return res.status(StatusCodes.OK).send({
      status: 'Success',
      message: 'Admin logged in successfully',
      admin: admin.toJSON(),
      token
    });
  } catch (error) {
    logger.error('Login error:', error.message);
    return res.status(StatusCodes.UNAUTHORIZED).send({
      status: 'Error',
      message: error.message || 'Invalid credentials'
    });
  }
};

// New logout function
exports.logout = async (req, res) => {
  try {
    logger.info('Starting logout function...');
    // Expect Authorization: Bearer <token>
    const token = req.header('Authorization').replace('Bearer ', '');

    // Find the admin who holds this token
    const admin = await Admin.findOne({ 'tokens.token': token });
    if (!admin) {
      logger.warn('Logout attempted with invalid token.');
      return res.status(StatusCodes.UNAUTHORIZED).send({
        status: 'Error',
        message: 'Invalid token'
      });
    }

    // Remove the token from their list
    admin.tokens = admin.tokens.filter((t) => t.token !== token);
    await admin.save();

    logger.info('Admin logged out successfully.');
    return res.status(StatusCodes.OK).send({
      status: 'Success',
      message: 'Logged out successfully'
    });
  } catch (error) {
    logger.error('Logout error:', error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: 'Error',
      message: error.message || 'Logout failed'
    });
  }
};
