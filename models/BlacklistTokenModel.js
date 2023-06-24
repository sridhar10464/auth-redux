const mongoose = require("mongoose");

const blacklistSchema = mongoose.Schema(
  {
    token: {
      type: String,
    },
    expiresAt: {
        type: Date,
    },
  },
  
);

const BlacklistToken = mongoose.model("BlacklistToken", blacklistSchema);

module.exports = BlacklistToken;