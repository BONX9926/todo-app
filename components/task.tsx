"use client"
import { FC } from 'react'
import { Checkbox } from './ui/checkbox'
import moment from 'moment';
import { Button } from './ui/button';

export interface TaskContentProps {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  done: boolean;
}

export interface TaskProps {
  onEditClick?: (value: TaskContentProps) => void;
  onDeleteClick?: (value: TaskContentProps) => void;
  onCheckedChange?: (checked: boolean, value: TaskContentProps) => void;
  data: TaskContentProps;
}

const Task:FC<TaskProps> = ({data, onEditClick, onDeleteClick, onCheckedChange}) => {
  return (
    <li  
      className="rounded-lg border border-gray-500/20 flex items-center p-5 gap-5 mb-5 
      hover:cursor-pointer hover:shadow-md transition-shadow duration-300">
      <Checkbox  
        className="border-zinc-500/40 
        data-[state=checked]:border-sky-500 
        data-[state=checked]:bg-sky-500 self-start mt-[3.5px]"
        checked={data.done} 
        onCheckedChange={(checked) => onCheckedChange?.(checked as boolean, data)}
      />
      <div className='flex flex-col flex-1'>
        <p className="w-full line-clamp-1">{data.title}</p>
        <span className="line-clamp-1 text-xs text-zinc-500/50">{moment(data.updatedAt).fromNow(true)}</span>
      </div>
      <Button 
        className="capitalize bg-green-500 hover:bg-green-500/90" 
        type="button"
        onClick={() => onEditClick?.(data)}
        >
          edit
      </Button>
      <Button 
        className="capitalize bg-red-500 hover:bg-red-500/90" 
        type="button" 
        onClick={() => onDeleteClick?.(data)}
      >
        delete
      </Button>
    </li>
  )
}

export default Task