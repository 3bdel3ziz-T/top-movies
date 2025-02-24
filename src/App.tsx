import { useState, useEffect } from "react";
import Search from "./components/Search";
import ErrorMsg from "./components/ErrorMsg";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_BASE_URL: string = import.meta.env.VITE_TMDB_BASE_URL;
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
	const [moviesList, setMoviesList] = useState<object[]>([]);

	// console.log(moviesList,isLoading,setIsLoading);

	async function fetchMovies(): Promise<void> {
		try {
			const endPoint: string = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;

			setIsLoading(true);
			const response = await fetch(endPoint, API_OPTIONS);
			const data = await response.json();
			if (response.ok && response.status === 200) {
				setIsLoading(false);
				console.log(data.results);
				setMoviesList(data.results);
				console.log(moviesList);
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
					<ErrorMsg error={errorMsg} />
				</div>
			</div>
		</main>
	);
}

export default App;
