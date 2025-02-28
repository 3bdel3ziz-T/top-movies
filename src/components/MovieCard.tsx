export type MovieInfo = {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: Date;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
};

function MovieCard({
	movie: {
		// id,
		title,
		poster_path,
		vote_average,
		original_language,
		release_date,
	},
}: {
	movie: MovieInfo;
}) {
	const poster_url: string = `https://image.tmdb.org/t/p/w500/${poster_path}`;
	const noPoster_url: string = `./no-movie.png`;
	return (
		<div className="movie-card">
			<img src={poster_path ? poster_url : noPoster_url} alt={title} />
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
