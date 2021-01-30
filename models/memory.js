import mongoose from "mongoose";
import Joi from "joi";

const meomrySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: { type: String, required: true },
    tags: [String],
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    selectedFile: { type: String, required: true },
    likes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

function validateMemory(memory) {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    selectedFile: Joi.string().required(),
    tags: Joi.objectId().required(),
  });

  return schema.validate(memory);
}

export default Memory = mongoose.model("Memory", meomrySchema);
module.exports.validateMemory = validateMemory;
