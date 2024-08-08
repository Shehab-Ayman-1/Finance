"use client";
import { usePathname } from "next/navigation";
import { ListItem } from "./listItem";
import { cn } from "@/utils/shadcn";

const routes = [
    { href: "/", label: "Overview" },
    { href: "/transactions", label: "Transactions" },
    { href: "/accounts", label: "Accounts" },
    { href: "/categories", label: "Categories" },
    { href: "/settings", label: "Settings" },
];

type NavListProps = {
    isMobile: boolean;
};

export const NavList = ({ isMobile }: NavListProps) => {
    const pathname = usePathname();

    return (
        <nav className={cn("flex-start gap-2", isMobile && "mt-6 flex-col")}>
            {routes.map(({ href, label }) => (
                <ListItem key={label} href={href} label={label} isActive={href === pathname} isMobile={isMobile} />
            ))}
        </nav>
    );
};
