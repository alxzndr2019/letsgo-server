import { validationResult } from 'express-validator';

import { Request, Response, NextFunction } from "express";

export const validateUserCreation = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error(errors.array().map(error => error.msg).join(', '));
    }
    next();
  };