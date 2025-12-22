import { Request, Response, NextFunction } from "express";
import { transactionCreateValidator } from "../validators/transaction.validate";
import response from "../utils/response";

const validateTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await transactionCreateValidator.validate(req.body, { abortEarly: false });
        next();
    } catch (error) {
        response.error(res, error, "Transaction validation failed");
    }
}

export default { validateTransaction };