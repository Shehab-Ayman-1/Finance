import { useForm } from "react-hook-form";
import { Trash2Icon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/ui/button";
import { Input } from "@/ui/input";

import { useConfirm } from "@/hooks/useConfirm";
import { schema, FormValues } from "../schema";
import { Label } from "@/ui/label";

type FormProps = {
    id?: string;
    disabled?: boolean;
    defaultValues?: FormValues;
    onSubmit: (value: FormValues) => void;
    onDelete?: () => void;
};

export const Form = ({ id, defaultValues, disabled, onSubmit, onDelete }: FormProps) => {
    const { register, setValue, handleSubmit } = useForm<FormValues>({ defaultValues, resolver: zodResolver(schema) });
    const [ConfirmDialog, confirm] = useConfirm("Are You Sure?", "You Are About To Delete This Account");

    const handleDelete = async () => {
        const ok = await confirm();
        if (ok) onDelete?.();
    };

    const options = {
        onChange: (event: any) => setValue("name", event.target.value),
    };

    return (
        <form className="space-y-4 pt-4" onSubmit={handleSubmit(onSubmit)}>
            <ConfirmDialog />
            <div className="">
                <Label htmlFor="name" className="font-bold">
                    Name
                </Label>
                <Input id="name" placeholder="E.G. Cash, Bank, Credit Card" {...register("name", options)} />
            </div>

            <div className="buttons">
                <Button type="submit" size="lg" className="w-full" disabled={disabled}>
                    {id ? "Save Changes" : "Create Account"}
                </Button>

                {id && (
                    <Button
                        type="button"
                        size="lg"
                        variant="outline"
                        className="mt-2 w-full text-rose-500 hover:bg-rose-50"
                        onClick={handleDelete}
                    >
                        <Trash2Icon className="mr-2 size-4" />
                        Delete Account
                    </Button>
                )}
            </div>
        </form>
    );
};
