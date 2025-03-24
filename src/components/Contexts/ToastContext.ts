import { createContext } from "react";
import { ToastMsg } from "../../../public/types/toast";

export const ToastContext = createContext<ToastMsg[]>([] as ToastMsg[]);