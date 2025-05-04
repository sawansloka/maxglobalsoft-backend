const mongoose = require('mongoose');
const validator = require('validator');

const subscriptionSchema = new mongoose.Schema(
  {
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
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Subscription', subscriptionSchema);
