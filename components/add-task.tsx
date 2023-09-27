import { FC, MouseEvent, memo} from "react";
import { Button } from "./ui/button";

interface AddTaskProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const AddTask:FC<AddTaskProps> = ({ onClick }) => {
  return (
    <Button className="w-full" type="button" onClick={onClick}>Add new task +</Button>
  )
}

export default memo(AddTask);