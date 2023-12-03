const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  url: String,
  filename: String,
});

documentSchema.virtual('thumbnail').get(function () {
  return this.url.replace('/upload', '/upload/h_200,w_200');
});

const opts = { toJSON: { virtuals: true } };

const combinedDetailsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    loanDetails: {
      type: {
        'select-loan-type': String,
        rateOfInterest: String,
        tenureDuration: String,
        loanAmount: String,
        financingType: String,
        bankService: String,
        tenureUnit: String,
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
    ApplicationStatus: {
      type: String,
      enums: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
  },
  opts
);

const CombinedDetails = mongoose.model(
  'CombinedDetails',
  combinedDetailsSchema
);

module.exports = CombinedDetails;
