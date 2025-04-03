import { useState, useEffect, useMemo, useReducer } from "react";
import Search from "./components/Search";
import Loading from "./components/Loading";
import { Movie } from "../public/types/movie";
import MovieCard from "./components/MovieCard";
import { Routes, Route } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";
import { FilterContext } from "./components/Contexts/FilterContext";
import Toast from "./components/Toast";
import ToastContext from "./components/Contexts/ToastContext";
import reducer from "./components/Reducers/ToastReducer";
import { MovieDetailsProvider } from "./components/Contexts/MovieDetailsContext";
import FetchData from "./components/api/fetchData";
import { useLoading } from "./components/Contexts/LoadingContext";

function App() {
	const { setLoading } = useLoading();
	const [searchTerm, setSearchTerm] = useState<string>("");

	const [moviesList, setMoviesList] = useState<Movie[]>([]);

	const [filters, setFilters] = useState<string[]>([]);

	const [toastMsgs, toastDispatch] = useReducer(reducer, []);

	useEffect(() => {
		setLoading(true);
		if (searchTerm.length > 0) {
			FetchData("search", { searchTxt: searchTerm }).then(
				(data: {
					page: number;
					results: [];
					total_pages: number;
					total_results: number;
				}) => {
					setMoviesList(data.results);
					setLoading(false);
				}
			);
			return;
		}
		FetchData("discover", {}).then(
			(data: {
				page: number;
				results: [];
				total_pages: number;
				total_results: number;
			}) => {
				setMoviesList(data.results);
				setLoading(false);
			}
		);
		return () => {};
	}, [searchTerm]);

	useEffect(() => {}, [filters]);

	const MoviesListTSX = useMemo(() => {
		if (moviesList.length === 0) return [];
		return moviesList.map((movie: Movie) => (
			<MovieCard key={movie.id} movie={movie as Movie} />
		));
	}, [moviesList]);

	return (
		<ToastContext.Provider value={{ toastMsgs, toastDispatch }}>
			<main>
				<Routes>
					{/* <Route path="/" element={<App />}> */}
					<Route
						path="/movieDetails/:movieID"
						element={
							<MovieDetailsProvider>
								<MovieDetails />
							</MovieDetailsProvider>
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
						<h2 className="ml-10">All Movies</h2>
						<Loading />
						<section className="all-movies">
							{Array.from(MoviesListTSX).length > 0 ? (
								MoviesListTSX
							) : (
								<h1 className="text-center col-span-full">No Movies Found</h1>
							)}
						</section>
					</div>
				</div>
			</main>
			<Toast toasts={toastMsgs} />
		</ToastContext.Provider>
	);
}

export default App;
