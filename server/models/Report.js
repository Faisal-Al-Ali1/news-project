const mongoose = require('mongoose');
const { Schema } = mongoose;

const reportSchema = new Schema(
  {
    article: { type: Schema.Types.ObjectId, ref: 'Article', required: true }, 
    reportedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
    reason: { type: String, required: true }, 
    status: { type: String, enum: ['pending', 'reviewed', 'dismissed'], default: 'pending' } 
  },
  { timestamps: true }
);

module.exports = mongoose.model('Report', reportSchema);
