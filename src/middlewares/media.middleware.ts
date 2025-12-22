import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 },
});

export default {
  single(fieldName: string) {
    return upload.single(fieldName);
  },

  multiple(fieldName: string, maxCount: number) {
    return upload.array(fieldName, maxCount);
  },
};
