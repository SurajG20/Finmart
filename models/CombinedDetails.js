const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  url: String,
  filename: String,
});

const combinedDetailsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the user who owns these details
    ref: 'User', // Reference the User model
    required: true,
  },
  loanDetails: {
    type: {
      loanType: String,
      rateOfInterest: mongoose.Schema.Types.Decimal128,
      tenurePeriodInYears: Number,
      amount: Number,
      financingType: String,
      bankService: String,
    },
    required: true,
  },
  personalDetails: {
    type: {
      firstName: String,
      lastName: String,
      dateOfBirth: Date,
      maritalStatus: String,
      email: String,
      mobileNumber: Number,
      presentAddress: String,
      state: String,
      city: String,
      zipCode: Number,
    },
    required: true,
  },
  documentUploads: [documentSchema],
});

const CombinedDetails = mongoose.model(
  'CombinedDetails',
  combinedDetailsSchema
);

module.exports = CombinedDetails;
