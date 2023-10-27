const mongoose = require('mongoose');
const { Schema } = mongoose;

const FileSchema = new Schema({
  url: String,
  filename: String,
});

FileSchema.virtual('thumbnail').get(function () {
  if (
    this.url.endsWith('.jpg') ||
    this.url.endsWith('.jpeg') ||
    this.url.endsWith('.png')
  ) {
    return this.url.replace('/upload', '/upload/h_200,w_200');
  }
  return this.url;
});

const opts = { toJSON: { virtuals: true } };

const JobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },

    description: {
      type: String,
      required: true,
    },
    images: [FileSchema],

    applications: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User', // reference to the User model
        },
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        message: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        attachment: [FileSchema],
      },
    ],
  },
  opts
);

const JobModel = mongoose.model('Jobs', JobSchema);

module.exports = JobModel;
