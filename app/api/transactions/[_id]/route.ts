import { NextRequest } from "next/server";
import { Transactions, TransactionType } from "@/server/models";
import { json } from "@/app/api/response";
import { DBConnection } from "@/server/configs";
import { getAuth } from "@clerk/nextjs/server";

type ResponseType = {
    params: { _id: string };
};

const select = ["_id", "account._id", "account.name", "category._id", "category.name", "payee", "amount", "notes", "date"];
export const GET = async (req: NextRequest, res: ResponseType) => {
    await DBConnection();

    try {
        const { _id } = res.params;
        const { userId } = getAuth(req);
        if (!userId) return json("Unauthorized", 401);

        const transactions: TransactionType[] = await Transactions.find({ _id, account: { userId } })
            .populate(["accountId", "categoryId"])
            .select(select)
            .sort("date")
            .exec();

        if (!transactions) return json("No Transactions Was Found", 400);
        return json(transactions);
    } catch (error: any) {
        const zodError = error?.issues.map((issue: any) => issue?.message).join(" | ");
        return json(zodError || error.message, 400);
    }
};
