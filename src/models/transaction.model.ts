import mongoose from "mongoose";

export interface ITransactionItem {
  product_id: mongoose.Types.ObjectId;
  name: string;
  current_price: number;
  quantity: number;
  subtotal: number;
}

export interface ITransaction {
  _id?: mongoose.Types.ObjectId;
  transaction_date: Date;
  total_price: number;
  money_receive: number;
  money_return: number;
  items: ITransactionItem[];
}

const TransactionSchema = new mongoose.Schema<ITransaction>({
  transaction_date: { type: Date, required: true },
  total_price: { type: Number, required: true },
  money_receive: { type: Number, required: true },
  money_return: { type: Number, required: true },
  items: [
    {
      product_id: { type: mongoose.Types.ObjectId, required: true, ref: "Product" },
      name: { type: String, required: true },
      current_price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      subtotal: { type: Number, required: true },
    },
  ],
});

const TransactionModel = mongoose.model<ITransaction>("Transaction", TransactionSchema);

export default TransactionModel;
