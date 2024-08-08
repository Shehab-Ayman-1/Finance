import { Providers } from "@/providers";
import "./sass/index.scss";

type LayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <html>
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
};

export default Layout;
