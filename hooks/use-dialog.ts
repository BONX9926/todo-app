import { useEffect, useState } from "react";

const useDialog = <T,>(value: boolean = false, initialData?: T) => {
  const [open, setOpen] = useState<boolean>(value);
  const [data, setData] = useState<T | undefined>(initialData);

  useEffect(() => {
    if(!open){
      setData(undefined);
    }
  },[open]);

  return {
    open,
    data,
    setOpen,
    setData
  };
}

export default useDialog;