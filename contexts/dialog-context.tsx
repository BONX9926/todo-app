"use client"
import { DialogProps } from "@radix-ui/react-dialog";
import { 
  Dispatch, 
  FC, 
  ReactElement, 
  ReactNode, 
  SetStateAction, 
  cloneElement, 
  createContext, 
  isValidElement, 
  useCallback, 
  useContext, 
  useEffect, 
  useMemo, 
  useState 
} from "react";

type PropsWithChildren<P = unknown> = P & { children?: ReactNode };

interface DialogContextProps {
  setElement: Dispatch<SetStateAction<ReactElement<DialogProps> | undefined>>
  setOpen: Dispatch<SetStateAction<boolean>>
}

const defaultValues = {
  setElement: () => {},
  setOpen: () => {}
}

const Context = createContext<DialogContextProps>(defaultValues);

export const useDialog = (element?: ReactElement<DialogProps>) => {
  const { setElement, setOpen } = useContext(Context);

  useEffect(() => {
    setElement(element)
  },[element]);

  return { setOpen };
};

const DialogContext:FC<PropsWithChildren> = ({children}) => {
  const [element, setElement] = useState<ReactElement<DialogProps>>();
  const [open, setOpen] = useState<boolean>(false);

  // function
  const onOpenChange = useCallback((value: boolean) => {
    setOpen(value);
    element?.props.onOpenChange?.(value);
  },[element?.props.onOpenChange])

  // memo 
  const value = useMemo(() => ({
    setElement,
    setOpen
  }),[]);

  useEffect(() => {
    setOpen(!!element?.props.open)
  },[element]);

  return (
    <Context.Provider value={value}>
      {/* modal */}
      {isValidElement(element) && cloneElement(element, {
        ...element.props,
        open,
        onOpenChange
      })}
      {children}
    </Context.Provider>
  )
}

export default DialogContext;