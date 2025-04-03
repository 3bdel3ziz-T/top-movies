import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { LoadingProvider } from "./components/Contexts/LoadingContext.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<LoadingProvider>
			<Router>
				<App />
			</Router>
		</LoadingProvider>
	</StrictMode>
);
