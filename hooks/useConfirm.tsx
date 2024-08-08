"use client";
import { useState } from "react";

import { Button } from "@/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/ui/dialog";

type PromiseProps = {
    resolve: (value: boolean) => void;
};

export const useConfirm = (title: string, message: string): [() => JSX.Element, () => Promise<unknown>] => {
    const [promise, setPromise] = useState<PromiseProps | null>(null);

    const confirm = () => {
        return new Promise((resolve) => {
            setPromise({ resolve });
        });
    };

    const onClose = () => {
        setPromise(null);
    };

    const onConfirm = () => {
        promise?.resolve(true);
        onClose();
    };

    const onCancel = () => {
        promise?.resolve(false);
        onClose();
    };

    const ConfirmDialog = () => {
        return (
            <Dialog open={promise !== null} onOpenChange={onClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>{message}</DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="pt-2">
                        <Button variant="outline" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button onClick={onConfirm}>Confirm</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    };

    return [ConfirmDialog, confirm];
};
