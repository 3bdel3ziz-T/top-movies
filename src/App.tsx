import { useState, useEffect, useMemo } from "react";
import Search from "./components/Search";
// import ErrorMsg from "./components/ErrorMsg";
import Loading from "./components/Loading";
import { Movie } from "../public/types/movie";
import MovieCard from "./components/MovieCard";
import { Routes, Route } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";
import { FilterContext } from "./components/Contexts/FilterContext";
import { MovieDetailsContext } from "./components/Contexts/MovieDetailsContext";
import { ToastContext } from "./components/Contexts/ToastContext";
import Toast from "./components/Toast";
import { ToastMsg } from "../public/types/toast";
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_BASE_URL: string = `https://api.themoviedb.org/3`;
const API_OPTIONS = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization: `Bearer ${TMDB_API_KEY}`,
	},
};

function App() {
	const [searchTerm, setSearchTerm] = useState<string>("");

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [moviesList, setMoviesList] = useState<Movie[]>([]);
	const [filters, setFilters] = useState<string[]>([]);
	const [movieID, setMovieID] = useState<string>("");
	const [movieDetails, setMovieDetails] = useState<Movie>({} as Movie);
	const [toastMsg, setToastMsg] = useState<ToastMsg[]>([
		{ type: "SUCCESS", title: "", body: "" },
		{ type: "SUCCESS", title: "", body: "" },
	]);

	const fetchMovies = async (query?: string) => {
		setIsLoading(true);
		try {
			let endPoint: string;
			if (query)
				endPoint = `${API_BASE_URL}/search/movie?query=${query}&include_adult=false&language=en-US&page=1&include_video=false`;
			else
				endPoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;

			const response = await fetch(endPoint, API_OPTIONS);
			const data = await response.json();
			if (response.ok && response.status === 200) {
				setMoviesList(data.results);
			} else console.error(`ERROR:${data.status_message}`);
			//
		} catch (error) {
			console.error(`ERROR:${error}`);
		} finally {
			setIsLoading(false);
		}
	};
	const fetchMovieDetails = async () => {
		if (!movieID) return;
		const endPoint: string = `${API_BASE_URL}/movie/${movieID}?api_key=${TMDB_API_KEY}&language=en-US`;
		const response = await fetch(endPoint, API_OPTIONS);
		const data = await response.json();
		if (response.ok && response.status === 200) {
			setMovieDetails(data);
			setToastMsg([
				...toastMsg,
				{ type: "SUCCESS", title: "Success", body: data.title },
			]);
		} else console.error(`ERROR:${data.status_message}`);
		//
	};

	useEffect(() => {
		fetchMovies(searchTerm);
	}, [searchTerm]);

	useEffect(() => {}, [filters]);

	useEffect(() => {
		fetchMovieDetails();
	}, [movieID]);

	const MoviesListTSX = useMemo(() => {
		return moviesList.map((movie: Movie) => (
			<MovieCard key={movie.id} movie={movie as Movie} />
		));
	}, [moviesList]);

	return (
		<main>
			<Routes>
				{/* <Route path="/" element={<App />}> */}
				<Route
					path="/movieDetails/:movieID"
					element={
						<MovieDetailsContext.Provider value={movieDetails}>
							<MovieDetails passMovieID={setMovieID} />
						</MovieDetailsContext.Provider>
					}
				/>
				{/* </Route> */}
			</Routes>
			<div className="pattern">
				<div className=" wrapper">
					<header>
						<img src="./hero.png" alt="Hero Banner" />
						<h1>
							Find <span className="text-gradient">Movies</span> You'll Enjoy
							Without the Hassle
						</h1>
						<FilterContext.Provider value={{ filters, setFilters }}>
							<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
						</FilterContext.Provider>
					</header>{" "}
					{/* <ErrorMsg title={errorMsg.title} body={errorMsg.body} /> */}
					<h2 className="ml-10">All Movies</h2>
					<section className="all-movies">
						<Loading isLoading={isLoading} />
						{MoviesListTSX}
					</section>
				</div>
			</div>
			<ToastContext.Provider value={toastMsg}>
				<Toast />
			</ToastContext.Provider>
		</main>
	);
}

export default App;
