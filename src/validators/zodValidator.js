import { StatusCodes } from 'http-status-codes';

import { custommErrorResponse } from '../utils/common/responseObjects.js';

export const validate = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      console.log('Validation error in zod validator: ', error);
      let explanation = [];
      let errorMessage = "";
      error?.issues?.forEach((e) => {
        explanation.push(e?.path[0]+ " : " + e?.message);
        errorMessage += " : " + `${e?.path[0]} ${e?.message}`;
      });
      res.status(StatusCodes.BAD_REQUEST).json(
        custommErrorResponse({
          message: 'Validation error'+ errorMessage,
          explanation
        })
      );
    }
  };
};
