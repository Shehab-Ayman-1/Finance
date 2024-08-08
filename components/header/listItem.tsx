import { Button } from "@/ui/button";
import { cn } from "@/utils/shadcn";

import Link from "next/link";

type ListItemProps = {
    href: string;
    label: string;
    isActive: boolean;
    isMobile: boolean;
};

export const ListItem = ({ href, label, isActive, isMobile }: ListItemProps) => {
    return (
        <Button
            asChild
            variant={isMobile ? "blueGhost" : "lightGhost"}
            className={cn(
                isActive ? "bg-white/10" : "bg-transparent",
                isMobile && "p-6 text-center text-xl font-semibold",
            )}
        >
            <Link href={href}>{label}</Link>
        </Button>
    );
};
