const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema(
  {
    jobTypes: {
      type: String,
      required: [true, 'Job type is required']
    },
    totalExp: {
      type: String,
      required: [true, 'Please provide total experience']
    },
    location: {
      type: String,
      required: [true, 'Please provide location']
    },
    date: {
      type: Date,
      required: [true, 'Please provide date']
    },
    shortDescription: {
      type: String,
      required: [true, '  Short description required']
    },
    description: {
      type: String,
      required: [true, 'Description required']
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active'
    },
    image: {
      type: String,
      required: [true, 'Image (base64) is required'],
      validate: {
        validator(v) {
          return /^data:image\/(png|jpeg|jpg|webp);base64,/.test(v);
        },
        message: 'Image must be a valid base64 encoded string with image type'
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Career', careerSchema);
