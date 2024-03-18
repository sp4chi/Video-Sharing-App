import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      required: [],
    },
    likes: {
      type: [String],
      required: [],
    },
    dislikes: {
      type: [String],
      required: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Video', VideoSchema);
