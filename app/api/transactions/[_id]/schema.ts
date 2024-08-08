import { z } from "zod";

export const getSchema = z.object({
    transactionId: z.string().optional(),
    from: z.string().optional(),
    to: z.string().optional(),
    accountId: z.string().optional(),
});
