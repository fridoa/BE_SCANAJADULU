import { Request, Response } from "express";
import uploader from "../utils/uploader";
import response from "../utils/response";

export default {
  async single(req: Request, res: Response) {
    if (!req.file) {
      return response.error(res, "No file uploaded", "File upload failed");
    }

    try {
      const result = await uploader.uploadSingle(req.file as Express.Multer.File);
      response.success(res, result, "File uploaded successfully");
    } catch (error) {
      response.error(res, error, "File upload failed");
    }
  },

  async multiple(req: Request, res: Response) {
    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      return response.error(res, "No files uploaded", "Files upload failed");
    }

    try {
      const results = await uploader.uploadMultiple(req.files as Express.Multer.File[]);
      response.success(res, results, "Files uploaded successfully");
    } catch (error) {
      response.error(res, error, "Files upload failed");
    }
  },

  async remove(req: Request, res: Response) {
    const { fileId } = req.body as { fileId: string };

    try {
      const result = await uploader.removeFile(fileId);
      response.success(res, result, "File removed successfully");
    } catch (error) {
      response.error(res, error, "File removal failed");
    }
  },
};
