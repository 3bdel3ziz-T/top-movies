import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { LoadingProvider } from "./components/Contexts/LoadingContext.tsx";
import { ToastProvider } from "./components/Contexts/ToastContext.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ToastProvider>
			<LoadingProvider>
				<Router>
					<App />
				</Router>
			</LoadingProvider>
		</ToastProvider>
	</StrictMode>
);
