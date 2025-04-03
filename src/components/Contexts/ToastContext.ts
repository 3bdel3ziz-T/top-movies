import { createContext, useContext } from 'react';
import { ToastMsg } from '../../../public/types/toast';

const ToastContext = createContext<{
  toastMsgs: ToastMsg[],
  toastDispatch: React.Dispatch<{
    type: "ERROR" | "SUCCESS";
    payload: { title: string; body: string };
  }>;
}>({
  toastMsgs: [],
  toastDispatch: () => { },
});

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error(
      "useToastContext must be used within a ToastProvider"
    );
  }
  return context;
};

export default ToastContext;