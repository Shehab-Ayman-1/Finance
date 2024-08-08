import { Header } from "./components/header";
import { Content } from "./components/content";
import { Card } from "@/ui/card";

type AccountsProps = {};

const Accounts = ({}: AccountsProps) => {
    return (
        <Card className="mx-auto -mt-24 max-w-6xl border-none pb-10 drop-shadow-sm">
            <Header />
            <Content />
        </Card>
    );
};

export default Accounts;
