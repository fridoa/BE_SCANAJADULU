import { NextFunction, Request, Response } from "express";
import { productCreateValidator, productUpdateValidator } from "../validators/product.validate";
import response from "../utils/response";

const validateCreateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await productCreateValidator.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    response.error(res, error, "Product validation failed");
  }
};

const validateProductUpdate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await productUpdateValidator.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    response.error(res, error, "Product update validation failed");
  }
};

export default { validateCreateProduct, validateProductUpdate };
