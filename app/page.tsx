"use client"
import AddTask from "@/components/add-task"
import ModalForm, { FormData } from "@/components/modal-form"
import { TaskContentProps } from "@/components/task";
import TodoList from "@/components/todo-list";
import useDialog from "@/hooks/use-dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  PayloadCreateTask, 
  PayloadUpdateTask, 
  createTask, 
  deleteTask, 
  getTodoList, 
  updateTask 
} from "@/services/todo";
import { useEffect, useState } from "react";

export default function Home() {

  const { toast } = useToast();

  const { open, data, setOpen, setData } = useDialog<TaskContentProps>();

  // state
  const [list, setList] = useState<TaskContentProps[]>();

  // function 
  const onCreateTask = async(values: FormData) => {
    const payload: PayloadCreateTask = {
      title: values.title
    }

    const result = await createTask(payload)

    if(result.status && result.data){
      setList(prev => {
        if(!prev) return;
        return [result.data, ...prev]
      })
    }

    toast({title: result.status ? "Success" : "Error", description: result.message})
  }

  const onUpdateTask = async(taskId: string, values: FormData, done?: boolean) => {
    let payload: PayloadUpdateTask = {
      title: values.title
    }

    if(done !== undefined) {
      payload = {...payload, done}
    }

    const result = await updateTask(taskId, payload)

    if(result.status && result.data){
      setList(prev => {
        if(!prev) return;
        return prev.map(e => e.id === taskId ? result.data : e)
      })
    }

    toast({title: result.status ? "Success" : "Error", description: result.message})
  }

  const onDeleteTask = async(taskId: string) => {
    const result = await deleteTask(taskId);

    if(result.status && result.data){
      setList(prev => {
        if(!prev) return;
        return prev.filter(e => e.id !== taskId)
      })
    }
    toast({title: result.status ? "Success" : "Error", description: result.message})
  }

  const onSubmit = (values: FormData) => {
    setOpen(false);
    if(!data){
      onCreateTask(values)
    }else{
      onUpdateTask(data.id, values)
    }
  }

  const onEditClick = (value: TaskContentProps) => {
    setOpen(true);
    setData(value)
  }

  const onDeleteClick = (value: TaskContentProps) => {
    const taskId = value.id
    onDeleteTask(taskId)
  }

  const onCheckedChange = (checked: boolean, value: TaskContentProps) => {
    const taskId = value.id
    const values: FormData =  {
      title: value.title
    }

    onUpdateTask(taskId, values, checked)
  }

  useEffect(() => {
    (async() => {
      const result = await getTodoList();

      let list:TaskContentProps[] = [];
      if(result.status && result.data){
        list = result.data;
      }
      setList(list)
    })();
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
