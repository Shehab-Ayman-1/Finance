import { InferSchemaType, Schema, model, models } from "mongoose";
import { Transactions } from "./transactions";

const schema = new Schema({
    userId: { type: String, required: true, trim: true },
    plaidId: { type: String, trim: true },
    name: { type: String, required: true, trim: true },
});

// While Delete Any Category, Remove The Relation Of All Its Transactions.
schema.pre("deleteMany", async function (next) {
    try {
        const accountId = this.getFilter().id;
        await Transactions.updateMany({ accountId }, { categoryId: undefined });
    } catch (error: any) {
        next(error);
    }
});

schema.pre("deleteOne", async function (next) {
    try {
        const accountId = this.getFilter().id;
        await Transactions.updateMany({ accountId }, { categoryId: undefined });
    } catch (error: any) {
        next(error);
    }
});

export const Categories = models?.categories || model("categories", schema);
export type CategoryType = InferSchemaType<typeof schema> & { _id?: string };
