"use client"
import { FC, memo } from "react";
import Task, { TaskContentProps, TaskProps } from "./task";
import TaskSkeleton from "./task-skeleton";

interface TodoListProps extends Omit<TaskProps, "data"> {
  list?: TaskContentProps[];
}

const TodoList:FC<TodoListProps> = ({list, onEditClick, onDeleteClick, onCheckedChange}) => {
  return (
    <ul className="mt-5 max-h-[600px] overflow-y-auto">
      { !list ? (
        <TaskSkeleton/>
      ) : list.length > 0 ? list.map((data, index) => (
        <Task 
          key={index.toString()} 
          data={data} 
          onEditClick={onEditClick} 
          onDeleteClick={onDeleteClick}
          onCheckedChange={onCheckedChange}
        />
      )) : (
        <li className="text-center text-gray-500 text-sm">No data available</li>
      )}
    </ul>
  )
}

export default memo(TodoList);