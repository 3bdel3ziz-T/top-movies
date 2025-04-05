import { useState, useEffect, useMemo } from "react";
import Search from "./components/Search";
import Loading from "./components/Loading";
import { Movie } from "../public/types/movie";
import MovieCard from "./components/MovieCard";
import { Routes, Route } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";
import { FilterContext } from "./components/Contexts/FilterContext";
import { MovieDetailsProvider } from "./components/Contexts/MovieDetailsContext";
import FetchData from "./components/api/fetchData";
import { useLoading } from "./components/Contexts/LoadingContext";
import Toast from "./components/Toast";
import { useToastContext } from "./components/Contexts/ToastContext";

function App() {
	const { setToastMsgs } = useToastContext();

	const { setLoading } = useLoading();
	const [searchTerm, setSearchTerm] = useState<string>("");

	const [moviesList, setMoviesList] = useState<Movie[]>([]);

	const [filters, setFilters] = useState<{ id: number; name: string }[]>([]);

	useEffect(() => {
		setLoading(true);
		if (searchTerm.length > 0) {
			FetchData("search", { searchTxt: searchTerm }, filters)
				.then(
					(data: {
						page: number;
						results: [];
						total_pages: number;
						total_results: number;
					}) => {
						setMoviesList(data.results);
						setLoading(false);
					}
				)
				.catch((error) => {
					setLoading(false);
					setToastMsgs({
						type: "ERROR",
						title: "Error",
						body: error.message,
					});
				});
			return;
		}
		FetchData("discover", {}, filters)
			.then(
				(data: {
					page: number;
					results: [];
					total_pages: number;
					total_results: number;
				}) => {
					setMoviesList(data.results);
					setLoading(false);
				}
			)
			.catch((error) => {
				setLoading(false);
				setToastMsgs({
					type: "ERROR",
					title: "Error",
					body: error.message,
				});
			});
		return () => {};
	}, [searchTerm, filters]);

	const MoviesListTSX = useMemo(() => {
		if (moviesList.length === 0) return [];
		return moviesList.map((movie: Movie) => (
			<MovieCard key={movie.id} movie={movie as Movie} />
		));
	}, [moviesList,filters,searchTerm]);

	return (
		<main>
			<Routes>
				<Route
					path="/movieDetails/:movieID"
					element={
						<MovieDetailsProvider>
							<MovieDetails />
						</MovieDetailsProvider>
					}
				/>
				<Route
					path="*"
					element={
						<main className="flex flex-col justify-center items-center">
							<h1 className="text-4xl">404</h1>
							<p className="text-2xl">Page Not Found</p>
						</main>
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
					</header>
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
			<Toast />
		</main>
	);
}

export default App;
