const { StatusCodes } = require('http-status-codes');
const Subscription = require('../../../../model/admin/home/subscription.model');
const { logger } = require('../../../../config/logger');

exports.createSubscription = async (req, res) => {
  try {
    logger.info('Creating a new subscription...');
    const { emailId, status } = req.body;

    const newSubscription = new Subscription({ emailId, status });

    await newSubscription.save();

    logger.info('Subscription created successfully.');
    return res.status(StatusCodes.CREATED).send({
      status: 'Success',
      message: 'Subscription created successfully.',
      data: newSubscription
    });
  } catch (err) {
    logger.error('Error creating subscription:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: 'Creation failed',
      error: err.message || err
    });
  }
};

exports.getSubscriptions = async (req, res) => {
  try {
    logger.info('Fetching subscriptions with pagination and search...');

    const { page = 1, limit = 10, search = '' } = req.query;

    const query = {
      emailId: { $regex: search, $options: 'i' }
    };

    const total = await Subscription.countDocuments(query);
    const subscriptions = await Subscription.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    logger.info('Subscriptions fetched successfully.');
    return res.status(StatusCodes.OK).send({
      status: 'Success',
      total,
      page: Number(page),
      limit: Number(limit),
      data: subscriptions
    });
  } catch (err) {
    logger.error('Error fetching subscriptions:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: 'Fetch failed',
      error: err.message || err
    });
  }
};

exports.getSubscriptionById = async (req, res) => {
  try {
    logger.info(`Fetching subscription with ID: ${req.params.id}...`);
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      logger.warn('Subscription not found.');
      return res.status(StatusCodes.NOT_FOUND).send({
        status: 'Not found',
        error: 'Subscription not found'
      });
    }

    logger.info('Subscription fetched successfully.');
    return res.status(StatusCodes.OK).send({
      status: 'Success',
      data: subscription
    });
  } catch (err) {
    logger.error('Error fetching subscription by ID:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: 'Fetch failed',
      error: err.message || err
    });
  }
};

exports.updateSubscription = async (req, res) => {
  try {
    logger.info(`Updating subscription with ID: ${req.params.id}...`);
    const updatedSubscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedSubscription) {
      logger.warn('Subscription not found for update.');
      return res.status(StatusCodes.NOT_FOUND).send({
        status: 'Not found',
        error: 'Subscription not found'
      });
    }

    logger.info('Subscription updated successfully.');
    return res.status(StatusCodes.OK).send({
      status: 'Success',
      message: 'Subscription updated successfully.',
      data: updatedSubscription
    });
  } catch (err) {
    logger.error('Error updating subscription:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: 'Update failed',
      error: err.message || err
    });
  }
};

exports.deleteSubscription = async (req, res) => {
  try {
    logger.info(`Deleting subscription with ID: ${req.params.id}...`);
    const deletedSubscription = await Subscription.findByIdAndDelete(
      req.params.id
    );

    if (!deletedSubscription) {
      logger.warn('Subscription not found for deletion.');
      return res.status(StatusCodes.NOT_FOUND).send({
        status: 'Not found',
        error: 'Subscription not found'
      });
    }

    logger.info('Subscription deleted successfully.');
    return res.status(StatusCodes.OK).send({
      status: 'Success',
      message: 'Subscription deleted successfully.'
    });
  } catch (err) {
    logger.error('Error deleting subscription:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: 'Deletion failed',
      error: err.message || err
    });
  }
};
