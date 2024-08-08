import Image from "next/image";
import Link from "next/link";

type LogoProps = {};

export const Logo = ({}: LogoProps) => {
    return (
        <Link href="/" className="hidden items-center md:flex">
            <Image src="/logo.svg" alt="Logo Image" height={28} width={28} />
            <p className="ml-2.5 text-2xl font-bold text-white">Finance</p>
        </Link>
    );
};
