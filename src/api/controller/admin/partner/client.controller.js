const { StatusCodes } = require('http-status-codes');
const Clients = require('../../../../model/admin/partner/client.model');
const { logger } = require('../../../../config/logger');

// Create a new client
exports.createClient = async (req, res) => {
  try {
    logger.info('Creating new client...');
    const { title, url, shortDescription, displayOrder, status, image } =
      req.body;

    const newClient = new Clients({
      title,
      url,
      shortDescription,
      displayOrder,
      status,
      image
    });

    await newClient.save();

    logger.info('Client created successfully.');
    return res.status(StatusCodes.CREATED).json({
      status: 'Success',
      message: 'Client created successfully.',
      data: newClient
    });
  } catch (err) {
    logger.error('Error creating client:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'Creation failed',
      error: err.message || err
    });
  }
};

// Get all clients
exports.getAllClients = async (req, res) => {
  try {
    logger.info('Fetching all clients...');
    const clients = await Clients.find().sort({ displayOrder: 1 });

    logger.info('Clients fetched successfully.');
    return res.status(StatusCodes.OK).json({
      status: 'Success',
      data: clients
    });
  } catch (err) {
    logger.error('Error fetching clients:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'Fetch failed',
      error: err.message || err
    });
  }
};

// Get client by ID
exports.getClientById = async (req, res) => {
  try {
    logger.info(`Fetching client by ID: ${req.params.id}`);
    const client = await Clients.findById(req.params.id);

    if (!client) {
      logger.warn('Client not found.');
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'Not found',
        error: 'Client not found'
      });
    }

    logger.info('Client fetched successfully.');
    return res.status(StatusCodes.OK).json({
      status: 'Success',
      data: client
    });
  } catch (err) {
    logger.error('Error fetching client by ID:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'Fetch failed',
      error: err.message || err
    });
  }
};

// Update client by ID
exports.updateClient = async (req, res) => {
  try {
    logger.info(`Updating client by ID: ${req.params.id}`);
    const updatedClient = await Clients.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedClient) {
      logger.warn('Client not found for update.');
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'Not found',
        error: 'Client not found'
      });
    }

    logger.info('Client updated successfully.');
    return res.status(StatusCodes.OK).json({
      status: 'Success',
      message: 'Client updated successfully.',
      data: updatedClient
    });
  } catch (err) {
    logger.error('Error updating client:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'Update failed',
      error: err.message || err
    });
  }
};

// Delete client by ID
exports.deleteClient = async (req, res) => {
  try {
    logger.info(`Deleting client by ID: ${req.params.id}`);
    const deletedClient = await Clients.findByIdAndDelete(req.params.id);

    if (!deletedClient) {
      logger.warn('Client not found for deletion.');
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'Not found',
        error: 'Client not found'
      });
    }

    logger.info('Client deleted successfully.');
    return res.status(StatusCodes.OK).json({
      status: 'Success',
      message: 'Client deleted successfully.'
    });
  } catch (err) {
    logger.error('Error deleting client:', err.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'Deletion failed',
      error: err.message || err
    });
  }
};
