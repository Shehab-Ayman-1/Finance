import { SheetDescription, SheetHeader, SheetTitle } from "@/ui/sheet";

type HeaderProps = {
    title: string;
    description: string;
};

export const Header = ({ title, description }: HeaderProps) => {
    return (
        <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
    );
};
