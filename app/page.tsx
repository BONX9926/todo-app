"use client"
import AddTask from "@/components/add-task"
import ModalForm, { FormData } from "@/components/modal-form"
import useDialog from "@/hooks/use-dialog";

export default function Home() {

  const { open, data, setOpen, setData } = useDialog<string>();

  // function 
  const onSubmit = (values: FormData) => {
  }

  return (
    <main className="border max-w-4xl mx-auto min-h-screen flex flex-col items-center py-20">
      <ModalForm data={data} open={open} onSubmit={onSubmit} onOpenChange={value => setOpen(value)}/>
      <h1 className="text-2xl font-bold mb-3">Todo List App</h1>
      <div className="w-1/2">
        <AddTask onClick={() => setOpen(true)}/>
      </div>
    </main>
  )
}
