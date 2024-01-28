import { User } from "../models/User";
import { Request, Response } from "express";
const jwtSecret = process.env.APP_SECRET;

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
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
};

export { createUserAccount };
