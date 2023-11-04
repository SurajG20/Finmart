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
      'select-loan-type': String,
      // rateOfInterest: mongoose.Schema.Types.Decimal128,
      tenureDuration: String,
      loanAmount: String,
      financingType: String,
      bankService: String,
    },
    required: true,
  },
  personalDetails: {
    type: {
      firstName: String,
      lastName: String,
      dateOfBirth: String,
      MaritalStatus: String,
      email: String,
      mobileNumber: String,
      presentAddress: String,
      state: String,
      city: String,
      zipCode: String,
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
