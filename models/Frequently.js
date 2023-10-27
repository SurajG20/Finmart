const mongoose = require('mongoose');

const frequently = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Frequently', frequently);
