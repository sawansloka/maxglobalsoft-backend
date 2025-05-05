const mongoose = require('mongoose');
const validator = require('validator');

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: Number,
      required: [true, 'Job Id is required']
    },
    jobType: {
      type: String,
      required: [true, 'Please provide job type']
    },
    applicantName: {
      type: String,
      required: [true, 'Please provide applciant name']
    },
    contactNumber: {
      type: Number,
      required: [false, 'Please provide your phone number'],
      minLength: 10,
      maxLength: 10
    },
    emailId: {
      type: String,
      unique: true,
      required: [true, 'Please provide your email address'],
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Please provide a valid Email');
        }
      }
    },
    date: {
      type: Date,
      required: [true, 'Please provide date']
    },
    description: {
      type: String,
      trim: true,
      minlength: [
        100,
        'Long description must be more than or equal to 100 characters'
      ]
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

module.exports = mongoose.model('Application', applicationSchema);
