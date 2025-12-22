import { Request, Response } from "express";
import TransactionModel from "../models/transaction.model";
import response from "../utils/response";
import { IPaginationQuery } from "../utils/interfaces";

export default {
  async create(req: Request, res: Response) {
    try {
      const result = await TransactionModel.create(req.body);
      response.success(res, result, "Transaction created successfully");
    } catch (error) {
      response.error(res, error, "Failed to create transaction");
    }
  },

  async findAll(req: Request, res: Response) {
    const { page = 1, limit = 10, startDate, endDate } = req.query as unknown as IPaginationQuery;
    try {
      const query: any = {};
      if (startDate && endDate) {
        Object.assign(query, {
          date: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        });
      }

      const [count, result] = await Promise.all([
        TransactionModel.countDocuments(query),
        TransactionModel.find(query)
          .skip((page - 1) * limit)
          .limit(limit)
          .sort({ createdAt: -1 })
          .exec(),
      ]);

      response.pagination(res, "Success fetching transactions", { total: count, totalPages: Math.ceil(count / limit), currentPage: page }, result);
    } catch (error) {
      response.error(res, error, "Failed to fetch transactions");
    }
  },

  async findOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await TransactionModel.findById(id);
      response.success(res, result, "Transaction fetched by id successfully");
    } catch (error) {
      response.error(res, error, "Failed to fetch transaction by id");
    }
  },
};
