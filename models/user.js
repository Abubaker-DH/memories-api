import mongoose from "mongoose";
import Joi from "joi";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  googleId: { type: String, required: true },
  google: { type: Boolean, default: false },
});

function validateSignUp(user) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });

  return schema.validate(user);
}

function validateSignIn(user) {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });

  return schema.validate(user);
}
export default mongoose.model("User", userSchema);
module.exports.validateSignUp = validateSignUp;
module.exports.validateSignIn = validateSignIn;
