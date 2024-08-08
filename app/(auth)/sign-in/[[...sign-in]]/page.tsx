import { SignIn } from "@clerk/nextjs";

import { AuthLogo } from "@/app/(auth)/components/logo";
import { AuthWelcome } from "@/app/(auth)/components/welcome";
import { AuthWidget } from "@/app/(auth)/components/widget";

const SignInPage = () => {
    return (
        <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
            <div className="flex-center h-full flex-col px-4 lg:flex">
                <AuthWelcome />
                <AuthWidget>
                    <SignIn />
                </AuthWidget>
            </div>
            <AuthLogo />
        </div>
    );
};

export default SignInPage;
