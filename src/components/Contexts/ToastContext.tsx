import { createContext, useContext, useState } from "react";
import { ToastMsg } from "../../../public/types/toast";

const ToastContext = createContext({
	toastMsgs: [] as ToastMsg[],
	setToastMsgs: (newToastMsg: ToastMsg) => {},
});

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
	const [toastMsgs, setNEWToastMsg] = useState<ToastMsg[]>([]);

	const setToastMsgs = (newToastMsg: ToastMsg) => {
		newToastMsg.id = Math.random().toString(36).substring(2, 9); // Generate a unique ID for the
		// new toast message
		newToastMsg.remove = false; // Add class to remove the toast message

		setNEWToastMsg((prevToastMsgs) => {
			return [...prevToastMsgs, newToastMsg];
		});
		setTimeout(() => {
			setNEWToastMsg((prevToastMsgs) => {
				return prevToastMsgs.map((toast) => {
					if (toast.id === newToastMsg.id) {
						toast.remove = true; // Add class to remove the toast message
					}
					return toast;
				});
			});
			setTimeout(() => {
				setNEWToastMsg((prevToastMsgs) => {
					return prevToastMsgs.filter((toast) => toast.id !== newToastMsg.id);
				});
			}, 500); // Remove the toast message after 0.5 seconds after adding the class
		}, 5000); // Add remove class to disappear after 4 seconds
	};
	return (
		<ToastContext.Provider value={{ toastMsgs, setToastMsgs }}>
			{children}
		</ToastContext.Provider>
	);
};
const useToastContext = () => {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error("useToastContext must be used within a ToastProvider");
	}
	return context;
};
export { ToastProvider, useToastContext };
