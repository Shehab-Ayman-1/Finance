type SelectedProps = {
    selectedLength: number;
    totalLength: number;
};

export const Selected = ({ selectedLength, totalLength }: SelectedProps) => {
    return (
        <div className="text-sm text-primary">
            {selectedLength} of {totalLength} selected.
        </div>
    );
};
