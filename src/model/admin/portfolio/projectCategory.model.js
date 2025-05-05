const mongoose = require('mongoose');

const projectCategorySchema = new mongoose.Schema(
  {
    parentPhotpholio: {
      type: String,
      required: [true, 'Parent Photpholio Menu is required']
    },
    name: {
      type: String,
      required: [true, 'Please provide name']
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('ProjectCategory', projectCategorySchema);
