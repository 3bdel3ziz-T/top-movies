import { createContext, useContext, useState } from "react";

const LoadingContext = createContext<{
	isLoading: boolean;
	setLoading: (loading: boolean) => void;
}>({
	isLoading: false,
	setLoading: (loading: boolean) => {
		return loading;
	},
});

const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
	const [isLoading, setLoading] = useState<boolean>(false);

	return (
		<LoadingContext.Provider value={{ isLoading, setLoading }}>
			{children}
		</LoadingContext.Provider>
	);
};

const useLoading = () => {
	const context = useContext(LoadingContext);
	if (!context) {
		throw new Error("useLoading must be used within a LoadingProvider");
	}
	return context;
};

export { useLoading, LoadingProvider };
