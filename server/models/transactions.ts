import { InferSchemaType, Schema, model, models } from "mongoose";

const schema = new Schema({
    payee: { type: String, required: true, trim: true },
    notes: { type: String, required: true, trim: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    accountId: {
        type: Schema.Types.ObjectId,
        ref: "accounts",
        required: true,
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "categories",
    },
});

export const Transactions = models?.transactions || model("transactions", schema);
export type TransactionType = InferSchemaType<typeof schema> & { _id?: string };
