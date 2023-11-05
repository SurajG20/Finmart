const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
  email: { type: String, required: true },
  timestamp: { type: Date, default: Date },
});

module.exports = mongoose.model('Newsletter', newsletterSchema);
