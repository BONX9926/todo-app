import api from '@/utils/api'
import { BaseResponse, HandleError } from "@/utils/response"
import { TaskContentProps } from "@/components/task"

export interface PayloadCreateTask {
  title: string
}
export interface PayloadUpdateTask extends PayloadCreateTask{
  done?: boolean
}

const getTodoList = async() => {
  try {
    const response = await api.get<BaseResponse<TaskContentProps[]>>("/todos");
    return response.data;
  } catch (error) {
    return HandleError(error)
  }
}

const createTask = async(data: PayloadCreateTask) => {
  try {
    const response = await api.post<BaseResponse<TaskContentProps>>("/todos", {...data});
    return response.data;
  } catch (error) {
    return HandleError(error)
  }
}

const updateTask = async(taskId: string, data: PayloadUpdateTask) => {
  try {
    const response = await api.patch<BaseResponse<TaskContentProps>>(`/todos/${taskId}`, {...data});
    return response.data;
  } catch (error) {
    return HandleError(error)
  }
}

const deleteTask = async(taskId: string,) => {
  try {
    const response = await api.delete<BaseResponse<TaskContentProps>>(`/todos/${taskId}`);
    return response.data;
  } catch (error) {
    return HandleError(error)
  }
}

export {
  getTodoList,
  createTask,
  updateTask,
  deleteTask
}