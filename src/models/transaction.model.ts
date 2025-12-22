import mongoose from "mongoose";

export interface ITrasaction {
    id: mongoose.Types.ObjectId;
    product_id: mongoose.Types.ObjectId;
    name: string;
    current_price: number;
    quantity: number;
    total_price: number;
    transaction_date: Date;
    money_receive: number;
    money_return: number;
}

const TransactionSchema = new mongoose.Schema<ITrasaction>({
    transaction_date: { type: Date, required: true },
    product_id: { type: mongoose.Types.ObjectId, required: true, ref: "Product" },
    name: { type: String, required: true },
    current_price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    total_price: { type: Number, required: true },
    money_receive: { type: Number, required: true },
    money_return: { type: Number, required: true },
});

const TransactionModel = mongoose.model<ITrasaction>("Transaction", TransactionSchema);

export default TransactionModel;