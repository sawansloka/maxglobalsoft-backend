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
