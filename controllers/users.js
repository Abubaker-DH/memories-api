import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);
import User, { validateSignUp, validateSignIn } from "../models/user.js";

export const signin = async (req, res) => {
  // validate the data enterd by user
  const { error } = validateSignIn(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const user = await User.findOne(req.body.email);
    if (!user) return res.status(404).json({ message: "User dosen't exist.." });
    // check if the hash pass is corect
    const hashPass = bcrypt.compare(req.body.password, user.password);
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
  const { error } = validateSignUp(req.body);
  if (error) return res.status(400).send(error.details[0].message);

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

export const google = async (req, res) => {
  // get the token from the body
  const { googleToken } = req.body;
  if (!googleToken) {
    return res.status(400).send({ code: 400, message: "Missing Token" });
  }

  try {
    // verify the token
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.CLIENT_ID,
    });
    if (!ticket) {
      return res.status(403).send("Invalid credentials");
    }
    // get the Data that we want to store in our Database
    const { name, email, sub } = ticket.getPayload();

    let user = await User.findOne(email);

    if (!user) {
      user = await User.create({
        email,
        name,
        googleId: sub,
        google: true,
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRIT
    );

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Somethig went wrong.. " });
  }
};
