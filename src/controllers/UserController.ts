import { User } from "../models/User";
import { Request, Response } from "express";
const bcrypt = require("bcryptjs");
const jwtSecret = process.env.APP_SECRET;
const jwt = require("jsonwebtoken");

const createUserAccount = async (req: Request, res: Response): Promise<any> => {
  const { name, email, password, passwordVerify } = req.body;

  try {
    if (!email || !password || !passwordVerify)
      return res.status(401).json({ error: "Email and Password are required" });
    if (password.length < 5)
      return res
        .status(401)
        .json({ error: "Password must be at least 5 characters" });
    if (password !== passwordVerify)
      return res.status(401).json({ error: "Passwords do not match" });
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(401)
        .json({ error: "An account with this email already exists" });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      passwordHash,
    });
    const savedUser = await newUser.save();

    res.status(200).json({ user: savedUser });
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
};

const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ error: "please enter all required values" });

    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(401).json({ error: "Wrong email or password." });

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (passwordCorrect) {
      const maxAge = 3 * 60 * 60;
      const token = jwt.sign(
        {
          id: existingUser._id,
          name: existingUser.name,
          userType: existingUser.role,
        },
        jwtSecret,
        {
          expiresIn: maxAge, // 3hrs in sec
        }
      );
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: maxAge * 1000, // 3hrs in ms
      });
      res.status(201).json({
        message: "User successfully Logged in",
        user: existingUser._id,
      });
    }
    if (!passwordCorrect)
      return res.status(401).json({ error: "Wrong email or password." });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const returnUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findById(decoded.id);
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

module.exports = { createUserAccount, login, returnUser };
