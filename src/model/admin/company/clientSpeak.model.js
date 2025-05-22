const mongoose = require('mongoose');

const clientSpeakSchema = new mongoose.Schema(
  {
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
    location: {
      type: String,
      required: [true, 'Please provide location']
    },
    youtubeLink: {
      type: String,
      trim: true,
      validate: {
        validator(v) {
          return !v || /^https?:\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$/.test(v);
        },
        message: (props) => `${props.value} is not a valid URL`
      }
    },
    date: {
      type: Date,
      required: [true, 'Please provide date']
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

module.exports = mongoose.model('ClientSpeak', clientSpeakSchema);
