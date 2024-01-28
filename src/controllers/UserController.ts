import { User } from "../models/User";
import { Request, Response, NextFunction } from "express";
import { validateUserCreation } from "../lib/validators";
const jwtSecret = process.env.APP_SECRET;

const createUserAccount = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { name, email, password, passwordVerify } = req.body;

  try {
    validateUserCreation(req, res, next);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("An account with this email already exists");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
};

export { createUserAccount };
