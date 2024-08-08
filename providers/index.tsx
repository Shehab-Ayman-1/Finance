import { ClerkProvider } from "@clerk/nextjs";

import { QueryProvider } from "@/providers/queryProvider";
import { SheetsProvider } from "@/providers/sheetsProvider";

import { Header } from "@/components/header";
import { Toaster } from "@/ui/sonner";
import { auth } from "@clerk/nextjs/server";

type ProvidersProps = {
    children: React.ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => {
    const { userId } = auth();

    return (
        <ClerkProvider>
            <QueryProvider>
                {userId && <Header />}
                <Toaster richColors />
                {children}
                <SheetsProvider />
            </QueryProvider>
        </ClerkProvider>
    );
};
