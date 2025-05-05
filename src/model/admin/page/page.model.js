const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema(
  {
    selectCategory: {
      type: String,
      required: [true, 'Category is required']
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title must be less than or equal to 100 characters']
    },
    name: {
      type: String,
      required: [true, 'Please provide name']
    },
    redirectUrl: {
      type: String,
      trim: true,
      validate: {
        validator(v) {
          return !v || /^https?:\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$/.test(v);
        },
        message: (props) => `${props.value} is not a valid URL`
      }
    },
    keyUrl: {
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
    displayOrder: {
      type: Number,
      min: [1, 'Display order must be at least 1'],
      default: 1
    },
    description: {
      type: String,
      trim: true,
      minlength: [
        100,
        'Description must be greater than or equal to 100 characters'
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
    },
    banner: {
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

module.exports = mongoose.model('Page', pageSchema);
