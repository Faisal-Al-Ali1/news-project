const mongoose = require('mongoose');
const { Schema } = mongoose;

const videoSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    videoUrl: { type: String, required: true }, 
    embedUrl: { type: String }, 
    thumbnail: { type: String }, 
    isPremium: { type: Boolean, default: true }, 
    isDeleted: { type: Boolean, default: false }, 
    views: { type: Number, default: 0 }, 
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }] 
  },
  { timestamps: true }
);

module.exports = mongoose.model('Video', videoSchema);