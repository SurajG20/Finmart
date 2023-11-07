const mongoose = require('mongoose');
const { Schema } = mongoose;

const LoanSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  interest: {
    type: String,
    required: true,
  },
  documents: {
    type: String,
    required: true,
  },
});

const LoanModel = mongoose.model('Loans', LoanSchema);

module.exports = LoanModel;
