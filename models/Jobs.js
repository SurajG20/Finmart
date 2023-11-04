const mongoose = require('mongoose');
const { Schema } = mongoose;

const FileSchema = new Schema({
  url: String,
  filename: String,
});

const opts = { toJSON: { virtuals: true } };

const JobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enums: [
        'Administration',
        'Asset Management',
        'Accounts Officer',
        'Branch Banking',
        'Technology',
      ],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    jobPosition: {
      type: String,
      required: true,
    },
    postedOn: {
      type: Date,
      default: Date,
    },
    description: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      enums: ['Full-time', 'Part-time'],
      required: true,
    },

    specifications: [{ type: String }],

    applications: [
      {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        message: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        attachment: FileSchema,
      },
    ],
  },
  opts
);

const JobModel = mongoose.model('Jobs', JobSchema);

module.exports = JobModel;
