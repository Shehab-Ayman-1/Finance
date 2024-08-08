import { Card, CardContent, CardHeader } from "@/ui/card";
import { Skeleton } from "@/ui/skeleton";
import { Loader2Icon } from "lucide-react";

type LayoutProps = {
    // children: React.ReactNode;
};

export const Loading = ({}: LayoutProps) => {
    return (
        <Card className="mx-auto -mt-24 max-w-6xl border-none pb-10 shadow-none drop-shadow-none">
            <CardHeader className="flex-between sm:flex-row">
                <Skeleton className="h-8 w-48 bg-primary/20" />
                <Skeleton className="h-8 w-32 bg-primary/20" />
            </CardHeader>
            <CardContent className="flex-center h-[500px] w-full">
                <Loader2Icon className="size-6 animate-spin text-primary/80" />
            </CardContent>
        </Card>
    );
};
