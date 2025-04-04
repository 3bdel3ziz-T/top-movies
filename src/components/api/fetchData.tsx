const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_BASE_URL: string = `https://api.themoviedb.org/3`;
const API_OPTIONS = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization: `Bearer ${TMDB_API_KEY}`,
	},
};

const FetchData = async (
	type: "search" | "discover" | "movieDetails" | "recommendations",
	params: { query?: string; movieID?: string; searchTxt?: string, genresID?: number } = {}
) => {
	let endPoint: string;
	switch (type) {
		case "discover":
			endPoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
			break;
		case "search":
			endPoint = `${API_BASE_URL}/search/movie?query=${params.searchTxt}&include_adult=false&language=en-US&page=1&include_video=false`;
			break;
		case "movieDetails":
			endPoint = `${API_BASE_URL}/movie/${params.movieID}?api_key=${TMDB_API_KEY}&language=en-US`;
			break;
		case "recommendations":
			endPoint = `${API_BASE_URL}/discover/movie?api_key=YOUR_TMDB_API_KEY&with_genres=${params.genresID}`
			break;
		default:
			throw new Error("Invalid type provided for fetchData");
	}
	const response = await fetch(endPoint, API_OPTIONS);
	const data = await response.json();
	if (response.ok && response.status === 200) {
		return data;
	} else {
		throw new Error(data.status_message);
	}
};
export default FetchData;
