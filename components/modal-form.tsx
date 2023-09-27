import * as z from "zod";
import { FC, memo, useEffect } from "react";
import { DialogProps } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

export type FormData = z.infer<typeof TodoSchema>

const TodoSchema = z.object({
  title: z.string()
})

interface ModalFormProps extends DialogProps {
  data?: string;
  onSubmit: (values: FormData) => void;
}

const ModalForm:FC<ModalFormProps> = ({data, onSubmit, ...props}) => {

  const form = useForm<FormData>({
      resolver: zodResolver(TodoSchema), 
      defaultValues: {
        title: ""
      }
    });

  useEffect(() => {
    if(!props.open)return;

    form.reset({title: data || ""});
  },[data, props.open]);

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`${!data ? "Add" : "Edit"} task`}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex gap-5 items-center">
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
              <Button 
                className="translate-y-4" 
                type="submit" 
                disabled={!form.formState.isValid || !form.formState.isDirty}>
                  Submit
            </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default memo(ModalForm);