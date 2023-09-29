import * as z from "zod";
import { FC, memo, useEffect } from "react";
import { DialogProps } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

export type FormData = z.infer<typeof TodoSchema>;

const TodoSchema = z.object({
  title: z.string(),
});

interface ModalFormProps extends DialogProps {
  typeModal: string;
  data?: string;
  onSubmit: (values: FormData) => void;
  onCancel: () => void;
  onClickConfirm: () => void;
}

const ModalForm: FC<ModalFormProps> = ({
  typeModal,
  data,
  onSubmit,
  onCancel,
  onClickConfirm,
  ...props
}) => {
  const form = useForm<FormData>({
    resolver: zodResolver(TodoSchema),
    defaultValues: {
      title: "",
    },
  });

  useEffect(() => {
    if (!props.open) return;

    form.reset({ title: data || "" });
  }, [data, props.open]);

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`${
            typeModal === "edit"
              ? "Edit"
              : typeModal === "delete"
              ? "Delete"
              : "Create"
          } task`}</DialogTitle>
        </DialogHeader>
        {typeModal === "delete" && (
          <div className="text-md">Do you want to delete this task?</div>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex gap-5 items-center">
              {typeModal === "create" || typeModal === "edit" ? (
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>What are you thinking?</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full border border-red-500"
                          placeholder="Type here... 😬😱🥶"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : null}

              <div
                className={
                  typeModal === "delete" ? "flex w-full justify-end" : ""
                }
              >
                {typeModal === "delete" ? (
                  <>
                    <Button
                      className="mx-3 bg-gray-500 hover:bg-gray-600"
                      type="button"
                      onClick={onCancel}
                    >
                      Cancel
                    </Button>
                    <Button
                      className={cn({"bg-red-500 hover:bg-red-600": typeModal === "delete"})}
                      type="button"
                      onClick={onClickConfirm}
                    >
                      Confirm
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      className="translate-y-4"
                      type="submit"
                      disabled={
                        !form.formState.isValid || !form.formState.isDirty
                      }
                    >
                      Submit
                    </Button>
                  </>
                )}
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default memo(ModalForm);
