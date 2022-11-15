import { NextFunction, Request, Response } from "express";

import { SchemaOf } from "yup";

const validateRequestMiddleware =
  (schema: SchemaOf<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      try {
        const validatedBody = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        req.validatedBody = validatedBody;

        return next();
      } catch (e: any) {
        return res.status(400).json({
          error: e.errors?.join(", "),
        });
      }
    } catch (e) {
      return next(e);
    }
  };

export default validateRequestMiddleware;
