import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Loader2Icon } from "lucide-react";

type AuthWidgetProps = {
    children: React.ReactNode;
};

export const AuthWidget = ({ children }: AuthWidgetProps) => {
    return (
        <div className="flex-center mt-8">
            <ClerkLoaded>{children}</ClerkLoaded>
            <ClerkLoading>
                <Loader2Icon className="animate-spin text-muted-foreground" />
            </ClerkLoading>
        </div>
    );
};
