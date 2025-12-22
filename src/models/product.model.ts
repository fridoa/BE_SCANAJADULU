import mongoose, { Types } from "mongoose";

export interface IProduct {
  id: Types.ObjectId;
  name: string;
  price: number;
  cost_price: number;
  stock: number;
  category?: string;
  image_url?: string;
  sku: string;
}

const ProductSchema = new mongoose.Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  cost_price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: false },
  image_url: { type: String, required: false },
  sku: { type: String, required: true, unique: true, index: true },
});

const ProductModel = mongoose.model<IProduct>("Product", ProductSchema);

export default ProductModel;
