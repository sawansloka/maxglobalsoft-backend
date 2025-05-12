const { StatusCodes } = require('http-status-codes');
const NewsEvents = require('../../../../model/admin/company/newsEvents.model');
const { logger } = require('../../../../config/logger');

exports.createNewsEvent = async (req, res) => {
  try {
    logger.info('Creating a new news/event...');
    const {
      title,
      name,
      location,
      date,
      shortDescription,
      description,
      status,
      image
    } = req.body;

    const newEvent = new NewsEvents({
      title,
      name,
      location,
      date,
      shortDescription,
      description,
      status,
      image
    });

    await newEvent.save();

    logger.info('News/Event created successfully.');
    return res.status(StatusCodes.CREATED).send({
      status: 'Success',
      message: 'News/Event created successfully.',
      data: newEvent
    });
  } catch (err) {
    logger.error('Error creating news/event:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: 'Creation failed',
      error: err.message || err
    });
  }
};

exports.getAllNewsEvents = async (req, res) => {
  try {
    logger.info('Fetching news/events with pagination and search...');

    const { page = 1, limit = 10, search = '' } = req.query;

    const searchRegex = new RegExp(search, 'i'); // case-insensitive

    const query = {
      $or: [
        { title: { $regex: searchRegex } },
        { name: { $regex: searchRegex } },
        { location: { $regex: searchRegex } },
        { shortDescription: { $regex: searchRegex } }
      ]
    };

    const total = await NewsEvents.countDocuments(query);
    const events = await NewsEvents.find(query)
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    logger.info('News/Events fetched successfully.');
    return res.status(StatusCodes.OK).send({
      status: 'Success',
      total,
      page: Number(page),
      limit: Number(limit),
      data: events
    });
  } catch (err) {
    logger.error('Error fetching news/events:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: 'Fetch failed',
      error: err.message || err
    });
  }
};

exports.getNewsEventById = async (req, res) => {
  try {
    logger.info(`Fetching news/event with ID: ${req.params.id}...`);
    const event = await NewsEvents.findById(req.params.id);

    if (!event) {
      logger.warn('News/Event not found.');
      return res.status(StatusCodes.NOT_FOUND).send({
        status: 'Not found',
        error: 'News/Event not found'
      });
    }

    logger.info('News/Event fetched successfully.');
    return res.status(StatusCodes.OK).send({
      status: 'Success',
      data: event
    });
  } catch (err) {
    logger.error('Error fetching news/event by ID:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: 'Fetch failed',
      error: err.message || err
    });
  }
};

exports.updateNewsEvent = async (req, res) => {
  try {
    logger.info(`Updating news/event with ID: ${req.params.id}...`);
    const updatedEvent = await NewsEvents.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );

    if (!updatedEvent) {
      logger.warn('News/Event not found for update.');
      return res.status(StatusCodes.NOT_FOUND).send({
        status: 'Not found',
        error: 'News/Event not found'
      });
    }

    logger.info('News/Event updated successfully.');
    return res.status(StatusCodes.OK).send({
      status: 'Success',
      message: 'News/Event updated successfully.',
      data: updatedEvent
    });
  } catch (err) {
    logger.error('Error updating news/event:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: 'Update failed',
      error: err.message || err
    });
  }
};

exports.deleteNewsEvent = async (req, res) => {
  try {
    logger.info(`Deleting news/event with ID: ${req.params.id}...`);
    const deletedEvent = await NewsEvents.findByIdAndDelete(req.params.id);

    if (!deletedEvent) {
      logger.warn('News/Event not found for deletion.');
      return res.status(StatusCodes.NOT_FOUND).send({
        status: 'Not found',
        error: 'News/Event not found'
      });
    }

    logger.info('News/Event deleted successfully.');
    return res.status(StatusCodes.OK).send({
      status: 'Success',
      message: 'News/Event deleted successfully.'
    });
  } catch (err) {
    logger.error('Error deleting news/event:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: 'Deletion failed',
      error: err.message || err
    });
  }
};
