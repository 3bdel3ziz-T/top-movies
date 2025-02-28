import { useState, useEffect } from "react";
import Search from "./components/Search";
import ErrorMsg from "./components/ErrorMsg";
import Loading from "./components/Loading";
import MovieCard, { MovieInfo } from "./components/MovieCard";

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
	const [errorMsg, setErrorMsg] = useState<{ title: string; body: string }>({
		title: "",
		body: "",
	});

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [moviesList, setMoviesList] = useState<MovieInfo[]>([]);

	async function fetchMovies(query?: string): Promise<void> {
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
			} else
				setErrorMsg({
					title: "something went wrong",
					body: data.status_message,
				});
		} catch (error) {
			setErrorMsg({
				title: "something went wrong",
				body: (error as string) || "Something went wrong!",
			});
		} finally {
			setIsLoading(false);
		}
	}
	useEffect(() => {
		fetchMovies(searchTerm);
	}, [searchTerm]);

	return (
		<main>
			<div className="pattern">
				<div className=" wrapper">
					<header>
						<img src="./hero.png" alt="Hero Banner" />
						<h1>
							Find <span className="text-gradient">Movies</span> You'll Enjoy
							Without the Hassle
						</h1>

						<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
					</header>{" "}
					<ErrorMsg title={errorMsg.title} body={errorMsg.body} />
					<h2 className="ml-10">All Movies</h2>
					<section className="all-movies">
						<Loading isLoading={isLoading} />
						{moviesList.map((movie: MovieInfo) => (
							<MovieCard key={movie.id} movie={movie as MovieInfo} />
						))}
					</section>
				</div>
			</div>
		</main>
	);
}

export default App;
