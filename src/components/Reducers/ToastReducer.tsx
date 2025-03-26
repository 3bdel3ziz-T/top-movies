// import { ReactNode, useReducer } from "react";
// import ToastContext from "../Contexts/ToastContext";
import { ToastMsg } from "../../../public/types/toast";

const reducer = (
	currentState: ToastMsg[],
	{
		type,
		payload,
	}: { type: "ERROR" | "SUCCESS"; payload: { title: string; body: string } }
) => {
	console.log(currentState);
	switch (type) {
		case "SUCCESS":
			return [
				...currentState,
				{ type: type, title: payload.title, body: payload.body },
			];
		case "ERROR":
			return [
				...currentState,
				{ type: type, title: payload.title, body: payload.body },
			];
		default:
			throw new Error(`Unknown action type: ${type}`);
	}
};
// const ToastProvider = ({ children }: { children: ReactNode }) => {
// 	const [toastMsgs, toastDispatch] = useReducer(reducer, []);
// 	return (
// 		<ToastContext.Provider value={{ toastMsgs, toastDispatch }}>
// 			{children}
// 		</ToastContext.Provider>
// 	);
// };

// export const useToast = () => {
// 	return useContext(ToastContext);
// };

// export default ToastProvider;
export default reducer;
