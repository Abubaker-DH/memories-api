import mongoose from "mongoose";

const meomrySchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  userId: String,
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  createAt: {
    type: Date,
    default: new Date(),
  },
});

const Memory = mongoose.model("Memory", meomrySchema);
export default Memory;
