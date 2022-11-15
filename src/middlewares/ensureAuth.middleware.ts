import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

import "dotenv/config";
import { IDecode } from "../interfaces/token";

const ensureAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      message: "Missing token",
    });
  }

  const token = authorization.split(" ")[1];

  jwt.verify(
    token,
    process.env.SECRET_KEY as string,
    (error, decode: IDecode | any) => {
      if (error) {
        return res.status(401).json({
          message: "Invalid Token",
        });
      }

      if (decode) {
        req.user = {
          id: decode.sub,
          accountId: decode.accountId,
        };
      }

      return next();
    }
  );
};

export default ensureAuthMiddleware;
