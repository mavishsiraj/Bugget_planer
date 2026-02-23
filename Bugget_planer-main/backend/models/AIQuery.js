const mongoose = require("mongoose");

const aiQuerySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  question: {
    type: String,
    required: true
  },
  aiResponseSummary: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 * 30 // -> fr 30 days TTL
  }
});

module.exports = mongoose.model("AIQuery", aiQuerySchema);
