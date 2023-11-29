const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotificationSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      required: [true, 'Please provide name'],
      maxlength: 50,
      minlength: 3,
    },
    lastname: {
      type: String,
      required: [true, 'Please provide name'],
      maxlength: 50,
      minlength: 3,
    },
    email: {
      type: String,
      minlength: 5,
      maxlength: 255,
      unique: true,
      required: [true, 'Please provide email'],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
      ],
    },
    phoneNumber: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      minlength: 5,
    },
    googleId: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    notifications: [NotificationSchema],
    isLoanTaken: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
