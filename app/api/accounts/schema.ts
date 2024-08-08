import { z } from "zod";

export const createSchema = z.object({
    userId: z.string().min(1),
    name: z.string().min(1),
});

export const editSchema = z.object({
    _id: z.string({ message: "Account ID Is Required" }),
    userId: z.string({ message: "User Id Is Required Field." }),
    name: z.string({ message: "Name Is Required" }),
});

export const deleteSchema = z.array(z.string());
