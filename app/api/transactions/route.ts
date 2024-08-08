import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { subDays, parse } from "date-fns";

import { Transactions, TransactionType } from "@/server/models";
import { DBConnection } from "@/server/configs";
import { createSchema, deleteSchema, editSchema } from "./schema";
import { json } from "../response";

const select = ["_id", "account._id", "account.name", "category._id", "category.name", "payee", "amount", "notes", "date"];
export const GET = async (req: NextRequest) => {
    await DBConnection();

    try {
        const { userId } = getAuth(req);
        if (!userId) return json("Unauthorized", 401);

        const { searchParams } = new URL(req.url);
        const accountId = searchParams.get("accountId");
        const from = searchParams.get("from");
        const to = searchParams.get("to");

        const defaultTo = new Date();
        const defaultFrom = subDays(defaultTo, 30);

        const startDate = from ? parse(from, "YYYY-MM-DD", new Date()) : defaultFrom;
        const endDate = to ? parse(to, "YYYY-MM-DD", new Date()) : defaultTo;

        const transactions: TransactionType[] = await Transactions.find({ accountId, account: { userId } })
            .populate(["accountId", "categoryId"])
            .select(select)
            .sort("date")
            .exec();

        if (!transactions) return json("No Transactions Was Found", 400);
        return json({ startDate, endDate, defaultFrom, transactions });
    } catch (error: any) {
        const zodError = error?.issues.map((issue: any) => issue?.message).join(" | ");
        return json(zodError || error.message, 400);
    }
};

export const POST = async (req: NextRequest) => {
    await DBConnection();

    try {
        const { userId } = getAuth(req);
        if (!userId) return json("Unauthorized", 401);

        const body = await req.json();
        const data = createSchema.parse(body);

        await Transactions.create(data);

        return json("The Transaction Was Successfully Created.");
    } catch (error: any) {
        const zodError = error?.issues.map((issue: any) => issue?.message).join(" | ");
        return json(zodError || error.message, 400);
    }
};

export const PUT = async (req: NextRequest) => {
    await DBConnection();

    try {
        const { userId } = getAuth(req);
        if (!userId) return json("Unauthorized", 401);

        const body = await req.json();
        const { _id, ...data } = editSchema.parse(body);

        const updated = await Transactions.updateOne({ _id, account: { userId } }, data);
        if (!updated.modifiedCount) return json("No Transactions Was Found.", 400);

        return json("The Transaction Was Successfully Updated.");
    } catch (error: any) {
        const zodError = error?.issues.map((issue: any) => issue?.message).join(" | ");
        return json(zodError || error.message, 400);
    }
};

export const DELETE = async (req: NextRequest) => {
    await DBConnection();

    try {
        const { userId } = getAuth(req);
        if (!userId) return json("Unauthorized", 401);

        const body = await req.json();
        const IDs = deleteSchema.parse(body);

        const deleted = await Transactions.deleteMany({ _id: { $in: IDs }, account: { userId } });
        if (!deleted.deletedCount) return json("No Transactions Was Deleted", 400);

        return json("Transaction Was Successfully Deleted.");
    } catch (error: any) {
        const zodError = error?.issues.map((issue: any) => issue?.message).join(" | ");
        return json(zodError || error.message, 400);
    }
};
