import { Link } from "react-router-dom";
import { Movie } from "../../public/types/movie";

function MovieCard({
	movie: {
		id,
		title,
		poster_path,
		vote_average,
		original_language,
		release_date,
	},
}: {
	movie: Movie;
}) {
	const poster_url: string = `https://image.tmdb.org/t/p/w500/${poster_path}`;
	const noPoster_url: string = `./no-movie.png`;
	return (
		<div className="movie-card">
			<Link to={`/movieDetails/${id}`}>
			<img src={poster_path ? poster_url : noPoster_url} alt={title} />
			</Link>
			<div className="mt-4">
				<h3>{title}</h3>

				<div className="content">
					<div className="rating">
						<img src="star.svg" alt="Star Icon" />
						<p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
					</div>

					<span>•</span>
					<p className="lang">{original_language}</p>

					<span>•</span>
					<p className="year">
						{release_date ? release_date.toString().split("-")[0] : "N/A"}
					</p>
				</div>
			</div>
		</div>
	);
}
export default MovieCard;
