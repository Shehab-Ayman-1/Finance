import { NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

import { DBConnection } from "@/server/configs";
import { Categories } from "@/server/models";
import { createSchema, deleteSchema, editSchema } from "./schema";
import { json } from "../response";

export const GET = async (req: NextRequest) => {
    await DBConnection();

    try {
        const { userId } = getAuth(req);
        if (!userId) return json("Unauthorized", 401);

        const categories = await Categories.find();
        return json(categories);
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

        await Categories.create({ ...data, userId, name: data.name });
        return json("The Category Was Succefully Creates");
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

        const updated = await Categories.updateOne({ _id: data._id, userId: data.userId }, { name: data.name });
        if (!updated.modifiedCount) return json("Sorry, Somthing Went Wrong.", 400);

        return json("Category Was Succesfully Updated.");
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

        const deleted = await Categories.deleteMany({ _id: { $in: IDs }, userId });
        if (!deleted.deletedCount) return json("No Category Was Deleted", 400);

        return json("Category(s) Was Successfully Deleted.");
    } catch (error: any) {
        const zodError = error?.issues.map((issue: any) => issue?.message).join(" | ");
        return json(zodError || error.message, 400);
    }
};
