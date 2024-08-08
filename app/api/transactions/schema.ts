import { z } from "zod";

export const createSchema = z.object({
    accountId: z.string(),
    categoryId: z.string().optional(),

    payee: z.string(),
    amount: z.number(),
    notes: z.string(),
    date: z.date(),
});

export const editSchema = z.object({
    _id: z.string(),
    accountId: z.string().optional(),
    categoryId: z.string().optional(),

    payee: z.string().optional(),
    amount: z.string().optional(),
    notes: z.string().optional(),
    date: z.string().optional(),
});

export const deleteSchema = z.array(z.string());
