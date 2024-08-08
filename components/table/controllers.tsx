import { Button } from "@/ui/button";

type ControllersProps = {
    previousPage: () => void;
    nextPage: () => void;
    getCanPreviousPage: () => boolean;
    getCanNextPage: () => boolean;
};

export const Controllers = ({ previousPage, nextPage, getCanPreviousPage, getCanNextPage }: ControllersProps) => {
    return (
        <div className="">
            <Button
                variant="outline"
                className="text-primary"
                onClick={previousPage}
                disabled={!getCanPreviousPage()}
            >
                Previous
            </Button>
            <Button variant="outline" className="text-primary" onClick={nextPage} disabled={!getCanNextPage()}>
                Next
            </Button>
        </div>
    );
};
