import { createContext, useContext, useState, useEffect } from "react";
import { Movie } from "../../../public/types/movie";
import { useParams } from "react-router-dom";
import { useLoading } from "./LoadingContext";
import { useToastContext } from "./ToastContext";
const MovieDetailsContext = createContext<{
	movieDetails: Movie;
	setMovieDetails: (movie: Movie) => void;
}>({ movieDetails: {} as Movie, setMovieDetails: () => {} });

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_BASE_URL: string = `https://api.themoviedb.org/3`;
const API_OPTIONS = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization: `Bearer ${TMDB_API_KEY}`,
	},
};

const MovieDetailsProvider = ({ children }: { children: React.ReactNode }) => {
	const { toastDispatch } = useToastContext();
	const { setLoading } = useLoading();
	const [movieDetails, setMovieDetails] = useState({} as Movie); // Replace with actual movie data

	const { movieID } = useParams<{ movieID: string }>();

	const fetchMovieDetails = async (movieID: string) => {
		if (!movieID) return;
		setLoading(true);
		const endPoint: string = `${API_BASE_URL}/movie/${movieID}?api_key=${TMDB_API_KEY}&language=en-US`;
		const response = await fetch(endPoint, API_OPTIONS);
		const data = await response.json();
		if (response.ok && response.status === 200) {
			setMovieDetails(data);
			setLoading(false);
		} else {
			toastDispatch({
				type: "ERROR",
				payload: { title: "Error", body: data.status_message },
			});
			setMovieDetails({} as Movie);
			setLoading(false);
		}
	};

	useEffect(() => {
		if (!movieID) return;
		fetchMovieDetails(movieID);
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
