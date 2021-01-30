import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User dosen't exist.." });
    // check if the hash pass is corect
    const hashPass = bcrypt.compare(password, user.password);
    if (!hashPass)
      return res.status(400).json({ message: "Invalid credentials.." });

    // generate the Token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRIT,
      { expiresIn: "1h" }
    );
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Somethig went wrong.. " });
  }
};

export const signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists.." });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password don't match.." });
    // hash the pass befpr store it in the DB
    const hashPass = await bcrypt.hash(password, 12);
    // create user and compine the first & last name in the name field
    const result = await User.create({
      email,
      password: hashPass,
      name: `${firstName} ${lastName}`,
    });
    // create the Token
    const token = jwt.sign(
      { id: result._id, email: result.email },
      process.env.JWT_SECRIT,
      { expiresIn: "1h" }
    );
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Somethig went wrong.. " });
  }
};
