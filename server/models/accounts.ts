import { Schema, model, models, InferSchemaType } from "mongoose";
import { Transactions } from "./transactions";

const schema = new Schema({
    userId: { type: String, required: true, trim: true },
    plaidId: { type: String, trim: true },
    name: { type: String, required: true, trim: true },
});

// Delete All The Transactions Related With This Account
schema.pre("deleteMany", async function (next) {
    try {
        const accountId = this.getFilter().id;
        await Transactions.deleteMany({ accountId });
        next();
    } catch (error: any) {
        next(error);
    }
});

schema.pre("deleteOne", async function (next) {
    try {
        const accountId = this.getFilter().id;
        await Transactions.deleteMany({ accountId });
        next();
    } catch (error: any) {
        next(error);
    }
});

export const Accounts = models?.accounts || model("accounts", schema);
export type AccountType = InferSchemaType<typeof schema> & { _id?: string };
