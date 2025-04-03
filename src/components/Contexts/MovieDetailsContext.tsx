import { createContext, useContext, useState, useEffect } from "react";
import { Movie } from "../../../public/types/movie";
import { useParams } from "react-router-dom";
import { useLoading } from "./LoadingContext";
import FetchData from "../api/fetchData";
import { useToastContext } from "./ToastContext";

const MovieDetailsContext = createContext<{
	movieDetails: Movie;
	setMovieDetails: (movie: Movie) => void;
}>({ movieDetails: {} as Movie, setMovieDetails: () => {} });

const MovieDetailsProvider = ({ children }: { children: React.ReactNode }) => {
	const { setToastMsgs } = useToastContext();
	const [movieDetails, setMovieDetails] = useState({} as Movie); // Replace with actual movie data

	const { movieID } = useParams<{ movieID: string }>();

	const { setLoading } = useLoading();
	useEffect(() => {
		if (!movieID) return;
		setLoading(true);
		FetchData("movieDetails", { movieID })
			.then((data: Movie) => {
				setMovieDetails(data);
				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
				setToastMsgs({
					type: "ERROR",
					title: "Error",
					body: error.message,
				});
			});
	}, [movieID]);
	return (
		<MovieDetailsContext.Provider value={{ movieDetails, setMovieDetails }}>
			{children}
		</MovieDetailsContext.Provider>
	);
};
const useMovieDetailsContext = () => {
	const context = useContext(MovieDetailsContext);
	if (!context) {
		throw new Error(
			"useMovieDetailsContext must be used within a MovieDetailsProvider"
		);
	}
	return context;
};

export { MovieDetailsProvider, useMovieDetailsContext };
