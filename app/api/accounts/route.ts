import { NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

import { DBConnection } from "@/server/configs";
import { Accounts } from "@/server/models";
import { createSchema, deleteSchema, editSchema } from "./schema";
import { json } from "../response";

export const GET = async (req: NextRequest) => {
    await DBConnection();

    try {
        const { userId } = getAuth(req);
        if (!userId) return json("Unauthorized", 401);

        const accounts = await Accounts.find();
        return json(accounts);
    } catch (error: any) {
        return json(error.message, 400);
    }
};

export const POST = async (req: NextRequest) => {
    await DBConnection();

    try {
        const { userId } = getAuth(req);
        if (!userId) return json("Unauthorized", 401);

        const body = await req.json();
        const data = createSchema.parse(body);

        await Accounts.create({ ...data, userId, name: data.name });
        return json("The Account Was Succefully Creates");
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
        const data = editSchema.parse(body);

        const updated = await Accounts.updateOne({ _id: data._id, userId: data.userId }, { name: data.name });
        if (!updated.modifiedCount) return json("Sorry, Somthing Went Wrong.", 400);

        return json("Account Was Succesfully Updated.");
    } catch (error: any) {
        const zodError = error?.issues.map((issue: any) => issue?.message).join(" | ");
        return json(zodError || error.message, 400);
    }
};

export const DELETE = async (req: NextRequest) => {
    await DBConnection();

    try {
        const { userId } = getAuth(req);
        if (!userId) return json("Unauthorized", 400);

        const body = await req.json();
        const IDs = deleteSchema.parse(body);

        const deleted = await Accounts.deleteMany({ _id: { $in: IDs }, userId });
        if (!deleted.deletedCount) return json("No Account Was Deleted", 400);

        return json("Account(s) Was Successfully Deleted.");
    } catch (error: any) {
        const zodError = error?.issues.map((issue: any) => issue?.message).join(" | ");
        return json(zodError || error.message, 400);
    }
};
