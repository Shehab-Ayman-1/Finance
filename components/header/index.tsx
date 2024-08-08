import { UserButton, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";

import { Logo } from "./logo";
import { Navigation } from "./navigation";
import { Loader2Icon } from "lucide-react";
import { WelcomeMsg } from "./welcomeMsg";

type HeaderProps = {};

export const Header = ({}: HeaderProps) => {
    return (
        <header className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 pb-36 lg:px-14">
            <div className="mx-auto max-w-6xl">
                <div className="flex-between mb-14 w-full">
                    <div className="flex-start lg:gap-x-16">
                        <Logo />
                        <Navigation />
                    </div>
                    <div className="">
                        <ClerkLoading>
                            <Loader2Icon className="size-8 animate-spin text-white" />
                        </ClerkLoading>
                        <ClerkLoaded>
                            <UserButton />
                        </ClerkLoaded>
                    </div>
                </div>
                <WelcomeMsg />
            </div>
        </header>
    );
};
