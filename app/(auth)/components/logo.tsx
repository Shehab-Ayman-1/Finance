import Image from "next/image";

type AuthLogoProps = {};

export const AuthLogo = ({}: AuthLogoProps) => {
    return (
        <div className="flex-center hidden h-full bg-blue-600 lg:flex">
            <Image src="/logo.svg" alt="logo" height={100} width={100} />
        </div>
    );
};
