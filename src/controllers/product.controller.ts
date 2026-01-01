import { Request, Response } from "express";
import ProductModel from "../models/product.model";
import response from "../utils/response";
import { IPaginationQuery } from "../utils/interfaces";

export default {
  async create(req: Request, res: Response) {
    try {
      const result = await ProductModel.create(req.body);
      response.success(res, result, "Product created successfully");
    } catch (error) {
      response.error(res, error, "Failed to create product");
    }
  },

  async findAll(req: Request, res: Response) {
    const { page = 1, limit = 10, search, name, sku } = req.query as unknown as IPaginationQuery;
    try {
      const query: any = {};

      if (name) {
        Object.assign(query, {
          name: { $regex: name, $options: "i" },
        });
      }

      if (sku) {
        Object.assign(query, {
          sku: { $regex: sku, $options: "i" },
        });
      }

      if (search) {
        Object.assign(query, {
          $or: [
            {
              name: { $regex: search, $options: "i" },
            },
            {
              sku: { $regex: search, $options: "i" },
            },
          ],
        });
      }

      const [count, result] = await Promise.all([
        ProductModel.countDocuments(query),
        ProductModel.find(query)
          .skip((page - 1) * limit)
          .limit(limit)
          .sort({ createdAt: -1 })
          .exec(),
      ]);

      response.pagination(res, "Success fetching products", { total: count, totalPages: Math.ceil(count / limit), currentPage: page }, result);
    } catch (error) {
      response.error(res, error, "Failed to fetch products");
    }
  },

  async findOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await ProductModel.findById(id);
      response.success(res, result, "Product fetched by id successfully");
    } catch (error) {
      response.error(res, error, "Failed to fetch product by id");
    }
  },

  async findBySku(req: Request, res: Response) {
    try {
      const { sku } = req.params;
      const result = await ProductModel.findOne({ sku: { $regex: new RegExp(`^${sku}$`, "i") } });
      response.success(res, result, "Product fetched by SKU successfully");
    } catch (error) {
      response.error(res, error, "Failed to fetch product by SKU");
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await ProductModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      response.success(res, result, "Product updated successfully");
    } catch (error) {
      response.error(res, error, "Failed to update product");
    }
  },
  async remove(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await ProductModel.findByIdAndDelete(id);
      response.success(res, result, "Product deleted successfully");
    } catch (error) {
      response.error(res, error, "Failed to delete product");
    }
  },
};
