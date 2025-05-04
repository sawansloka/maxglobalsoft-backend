const { StatusCodes } = require('http-status-codes');
const ClientSpeak = require('../../../../model/admin/company/clientSpeak.model');
const { logger } = require('../../../../config/logger');

exports.createClientSpeak = async (req, res) => {
  try {
    logger.info('Creating a new Client Speak entry...');
    const {
      title,
      name,
      location,
      youtubeLink,
      date,
      shortDescription,
      description,
      status,
      image
    } = req.body;

    const newClientSpeak = new ClientSpeak({
      title,
      name,
      location,
      youtubeLink,
      date,
      shortDescription,
      description,
      status,
      image
    });

    await newClientSpeak.save();

    logger.info('Client Speak entry created successfully.');
    return res.status(StatusCodes.CREATED).send({
      status: 'Success',
      message: 'Client Speak entry created successfully.',
      data: newClientSpeak
    });
  } catch (err) {
    logger.error('Error creating Client Speak entry:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: 'Creation failed',
      error: err.message || err
    });
  }
};

exports.getClientSpeaks = async (req, res) => {
  try {
    logger.info('Fetching all Client Speak entries...');
    const entries = await ClientSpeak.find().sort({ createdAt: -1 });

    logger.info('Client Speak entries fetched successfully.');
    return res.status(StatusCodes.OK).send({
      status: 'Success',
      data: entries
    });
  } catch (err) {
    logger.error('Error fetching Client Speak entries:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: 'Fetch failed',
      error: err.message || err
    });
  }
};

exports.getClientSpeakById = async (req, res) => {
  try {
    logger.info(`Fetching Client Speak with ID: ${req.params.id}...`);
    const entry = await ClientSpeak.findById(req.params.id);

    if (!entry) {
      logger.warn('Client Speak entry not found.');
      return res.status(StatusCodes.NOT_FOUND).send({
        status: 'Not found',
        error: 'Client Speak entry not found'
      });
    }

    logger.info('Client Speak entry fetched successfully.');
    return res.status(StatusCodes.OK).send({
      status: 'Success',
      data: entry
    });
  } catch (err) {
    logger.error('Error fetching Client Speak by ID:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: 'Fetch failed',
      error: err.message || err
    });
  }
};

exports.updateClientSpeak = async (req, res) => {
  try {
    logger.info(`Updating Client Speak with ID: ${req.params.id}...`);
    const updatedEntry = await ClientSpeak.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedEntry) {
      logger.warn('Client Speak entry not found for update.');
      return res.status(StatusCodes.NOT_FOUND).send({
        status: 'Not found',
        error: 'Client Speak entry not found'
      });
    }

    logger.info('Client Speak entry updated successfully.');
    return res.status(StatusCodes.OK).send({
      status: 'Success',
      message: 'Client Speak entry updated successfully.',
      data: updatedEntry
    });
  } catch (err) {
    logger.error('Error updating Client Speak entry:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: 'Update failed',
      error: err.message || err
    });
  }
};

exports.deleteClientSpeak = async (req, res) => {
  try {
    logger.info(`Deleting Client Speak with ID: ${req.params.id}...`);
    const deletedEntry = await ClientSpeak.findByIdAndDelete(req.params.id);

    if (!deletedEntry) {
      logger.warn('Client Speak entry not found for deletion.');
      return res.status(StatusCodes.NOT_FOUND).send({
        status: 'Not found',
        error: 'Client Speak entry not found'
      });
    }

    logger.info('Client Speak entry deleted successfully.');
    return res.status(StatusCodes.OK).send({
      status: 'Success',
      message: 'Client Speak entry deleted successfully.'
    });
  } catch (err) {
    logger.error('Error deleting Client Speak entry:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: 'Deletion failed',
      error: err.message || err
    });
  }
};
