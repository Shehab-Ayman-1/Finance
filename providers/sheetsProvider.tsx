import { Fragment } from "react";

import { CreateAccountSheet } from "@/features/accounts/components/createSheet";
import { EditAccountSheet } from "@/features/accounts/components/editSheet";
import { CreateCategorySheet } from "@/features/categories/components/createSheet";
import { EditCategorySheet } from "@/features/categories/components/editSheet";
import { CreateTransactionSheet } from "@/features/transactions/components/createSheet";
import { EditTransactionSheet } from "@/features/transactions/components/editSheet";

export const SheetsProvider = () => {
    return (
        <Fragment>
            <CreateAccountSheet />
            <EditAccountSheet />

            <CreateCategorySheet />
            <EditCategorySheet />

            <CreateTransactionSheet />
            <EditTransactionSheet />
        </Fragment>
    );
};
