import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const jwtSecret = process.env.APP_SECRET;

export const adminAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const token = req.cookies.jwt;
  if (!token) {
    // Handle the case when the token is not present
    return res.status(401).json({ error: "Unauthorized" });
  }
  if (token) {
    jwt.verify(token, jwtSecret, (err: any, decodedToken: any) => {
      if (err) {
        return res?.status(401).json({ message: "Not authorized" });
      } else {
        if (decodedToken.userType !== "admin") {
          return res
            .status(401)
            .json({ message: "Not authorized", user: decodedToken });
        } else {
          next();
        }
      }
    });
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" });
  }
};

export const userAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const token = req.cookies.jwt;

  console.log(req);
  if (!token) {
    // Handle the case when the token is not present
    return res.status(401).json({ error: "Unauthorized" });
  }
  if (token) {
    jwt.verify(token, jwtSecret, (err: any, decodedToken: any) => {
      if (err) {
        return res.status(401).json({ message: "Not authorized" });
      }
      // if (decodedToken.userType !== "user") {
      //   return res.status(401).json({ message: "Not authorized" });
      // }

      next();
    });
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" });
  }
};
