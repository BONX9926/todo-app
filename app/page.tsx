"use client"
import AddTask from "@/components/add-task"
import ModalForm, { FormData } from "@/components/modal-form"
import { TaskContentProps } from "@/components/task";
import TodoList from "@/components/todo-list";
import useDialog from "@/hooks/use-dialog";
import { useEffect, useState } from "react";

export default function Home() {

  // state
  const [list, setList] = useState<TaskContentProps[]>();

  const { open, data, setOpen, setData } = useDialog<TaskContentProps>();

  // function 
  const onSubmit = (values: FormData) => {
  }

  const onEditClick = (value: TaskContentProps) => {
    setOpen(true);
    setData(value)
  }

  const onDeleteClick = (value: TaskContentProps) => {
    
  }

  const onCheckedChange = (checked: boolean, value: TaskContentProps) => {
    setList((prev) => {
      if(!prev) return;
      return prev.map(e => e.id === value.id ? {...e, done: checked} : e)
    })
  }

  useEffect(() => {
    // mock api
    setTimeout(() => {
      setList([])
    }, 1000);
  },[]) 

  return (
    <main className="max-w-4xl mx-auto min-h-screen flex flex-col items-center py-20">
      <ModalForm 
        data={data?.title} 
        open={open} 
        onSubmit={onSubmit} 
        onOpenChange={value => setOpen(value)}
      />
      <h1 className="text-2xl font-bold mb-3 capitalize">todo list app</h1>
      <div className="w-2/3">
        <AddTask onClick={() => setOpen(true)}/>
        <TodoList
          list={list}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
          onCheckedChange={onCheckedChange}
        />
      </div>
    </main>
  )
}
