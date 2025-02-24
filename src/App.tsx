import { useState, useEffect } from "react";
import Search from "./components/Search";
import ErrorMsg from "./components/ErrorMsg";
import Loading from "./components/Loading/Loading";
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
	const [errorMsg, setErrorMsg] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [moviesList, setMoviesList] = useState<MovieInfo[]>([]);

	async function fetchMovies(): Promise<void> {
		try {
			setIsLoading(true);

			const endPoint: string = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;

			const response = await fetch(endPoint, API_OPTIONS);
			const data = await response.json();
			if (response.ok && response.status === 200) {
				setMoviesList(data.results);
			} else setErrorMsg(data.status_message);
		} catch (error) {
			setErrorMsg((error as string) || "Something went wrong!");
		} finally {
			setIsLoading(false);
		}
	}
	useEffect(() => {
		fetchMovies();
	}, []);

	return (
		<main>
			<Loading isLoading={isLoading} />
			<div className="pattern">
				<div className="wrapper">
					<header>
						<img src="./hero.png" alt="Hero Banner" />
						<h1>
							Find <span className="text-gradient">Movies</span> You'll Enjoy
							Without the Hassle
						</h1>

						<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
					</header>{" "}
				</div>
				<ErrorMsg error={errorMsg} />
				<section className="all-movies  ">
					{moviesList.map((movie: MovieInfo) => (
						<div className="card" key={movie.id}>
							<MovieCard movie={movie as MovieInfo} />
						</div>
					))}
				</section>
			</div>
		</main>
	);
}

export default App;
