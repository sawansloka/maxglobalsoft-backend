const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    serviceTitle: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title must be less than or equal to 100 characters']
    },
    isDisplay: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      trim: true,
      validate: {
        validator(v) {
          return !v || /^https?:\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$/.test(v);
        },
        message: (props) => `${props.value} is not a valid URL`
      }
    },
    shortDescription: {
      type: String,
      trim: true,
      maxlength: [
        300,
        'Short description must be less than or equal to 300 characters'
      ]
    },
    description: {
      type: String,
      trim: true,
      minlength: [
        100,
        'Description must be more than or equal to 100 characters'
      ]
    },
    displayOrder: {
      type: Number,
      min: [1, 'Display order must be at least 1'],
      default: 1
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

module.exports = mongoose.model('Service', serviceSchema);
