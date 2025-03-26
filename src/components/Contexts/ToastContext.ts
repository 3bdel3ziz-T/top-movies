import { createContext } from 'react';
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

export default ToastContext;