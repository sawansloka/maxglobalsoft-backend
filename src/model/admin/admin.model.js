const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecretKey } = require('../../config/vars');

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please provide your username'],
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
      minLength: 8,
      trim: true
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

// Hide sensitive fields
adminSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.tokens;
  return user;
};

// Generate JWT and store in DB
adminSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, jwtSecretKey, { expiresIn: '2h' });
  user.tokens.push({ token });
  await user.save();
  return token;
};

// Login logic based on username + password
adminSchema.statics.findByCredentials = async (username, password) => {
  const user = await Admin.findOne({ username });
  if (!user) {
    throw new Error('Invalid username or password');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid username or password');
  }

  return user;
};

// Hash password before saving
adminSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  console.log('hashed-passowrd:  ', this.password);
  next();
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
