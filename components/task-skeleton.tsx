import { FC } from 'react'
import { Skeleton } from './ui/skeleton'

const TaskSkeleton:FC = () => {
  return (
    <li  
      className="rounded-lg border border-gray-500/20 flex items-center p-5 gap-5 mb-5 animate-pulse">
      <Skeleton className='mt-[3.5px] h-4 w-4 self-start bg-gray-500/20'></Skeleton>
      <div className='flex flex-col flex-1 gap-1'>
        <Skeleton className='w-full h-4 bg-gray-500/20'></Skeleton>
        <Skeleton className='w-1/4 h-3 bg-gray-500/20'></Skeleton>
      </div>
      <Skeleton className='w-14 h-8 bg-gray-500/20'></Skeleton>
      <Skeleton className='w-14 h-8 bg-gray-500/20'></Skeleton>
    </li>
  )
}

export default TaskSkeleton