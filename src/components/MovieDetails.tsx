import { Movie } from "../../public/types/movie";
import { useNavigate } from "react-router-dom";
import { useMovieDetailsContext } from "./Contexts/MovieDetailsContext";
import { useEffect, useState } from "react";
import { useToastContext } from "./Contexts/ToastContext";
import fetchData from "./api/fetchData";
import { Link } from "react-router-dom";
function MovieDetails() {
	const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
	const navigate = useNavigate();
	const movie: Movie = useMovieDetailsContext().movieDetails;
	const { setToastMsgs } = useToastContext();
	//handle if movie is not found
	useEffect(() => {
		if (movie.id) {
			fetchData("recommendations", {
				genresID: movie.genres[0].id,
			})
				.then((data) => {
					const recommendedMovies = data.results.filter(
						(m: Movie) => m.id !== movie.id
					);
					setRecommendedMovies(recommendedMovies);
				})
				.catch((error: Error) => {
					setToastMsgs({
						type: "ERROR",
						title: "Error",
						body: error.message,
					});
				});
		}
		//back to home page if movie is not found
		const handler = setTimeout(() => {
			if (!movie.id) {
				navigate("/");
				setToastMsgs({
					type: "ERROR",
					title: "Error",
					body: "It took so much time to load the movie details, please try again",
				});
			}
		}, 1500);
		return () => {
			clearTimeout(handler);
		};
	}, [movie]);
	//fetch recommended movies
	return (
		<div className="backLay md:px-10">
			{JSON.stringify(movie.id) && (
				<div className="container px-6 pb-8 max-w-6xl relative h-dvh md:max-h-[80dvh] lg:max-h-fit text-gray-100 justify-center bg-primary-2 md:rounded-xl shadow-2xl overflow-hidden overflow-y-auto z-40 animate-appear">
					<button
						onClick={() => navigate("/")}
						className=" relative z-50 cursor-pointer ml-auto text-right size-16 flex justify-center items-center text-4xl border-0 text-gray-200"
					>
						×
					</button>
					{/* <!-- Backdrop image (using backdrop_path) --> */}
					<div
						className="backdrop-image z-0"
						style={{
							backgroundImage: `url('https://image.tmdb.org/t/p/w500/${movie.backdrop_path}')`,
						}}
					></div>

					{/* <!-- Scrollable content container --> */}
					{/* <!-- Main Content --> */}
					<div className="flex flex-col lg:flex-row gap-8 relative">
						{/* <!-- Movie Details Section --> */}
						<div className="grid grid-cols-1 xs:grid-cols-5 w-full lg:w-2/3 sm:grid-cols-3 md:grid-cols-5 gap-6">
							{/* <!-- Movie Poster (poster_path) --> */}
							<div className="xs:col-span-2 sm:col-span-1 md:col-span-2 mt-6">
								<div className="rounded-lg overflow-hidden shadow-lg aspect-[11/16] bg-gray-800">
									<img
										alt="Movie Poster"
										className="w-full h-auto"
										src={
											movie.poster_path
												? "https://image.tmdb.org/t/p/w500" + movie.poster_path
												: "../../public/no-movie.png"
										}
									/>
								</div>
								<button className="w-full mt-4 bg-primary hover:bg-secondary text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center">
									<i className="bx bx-play-circle text-xl mr-2"></i>
									Watch Trailer
								</button>
							</div>

							{/* <!-- Movie Details --> */}
							<div className="xs:col-span-3 sm:col-span-2 md:col-span-3">
								<div className="flex justify-start items-center mb-2">
									{/* <!-- Title --> */}
									<h1 className="text-left m-0 mr-2 text-3xl md:text-4xl font-bold text-nowrap overflow-ellipsis overflow-hidden">
										{movie.title}
									</h1>
									{/* <!-- Adult content badge --> */}
									{movie.adult ? (
										<span className="bg-red-600 text-white text-xs px-2 py-1 rounded mr-2">
											+18
										</span>
									) : null}
								</div>
								{/* <!-- Original title (if different) --> */}
								<div className="text-gray-400 mb-2">
									Original Title:{" "}
									<span className="italic">{movie.original_title}</span>
								</div>
								{movie.status === "Released" ? (
									<div className="flex items-center mb-4">
										{/* <!-- Vote average --> */}
										<div className="flex items-center bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-lg px-3 py-1 mr-3">
											<img
												src="../../public/star.svg"
												className="size-4 mb-[2px] mr-2 inline-block"
												alt=""
											/>{" "}
											<span className="font-bold ">{movie.vote_average}</span>
											<span className="text-gray-400 text-sm ml-1">/10</span>
										</div>
										{/* <!-- Release date --> */}
										<span className="text-gray-400 ">
											{movie.runtime} min |{" "}
											{new Date(movie.release_date).toLocaleDateString(
												"en-US",
												{
													month: "long",
													day: "numeric",
													year: "numeric",
												}
											)}
										</span>
									</div>
								) : (
									<span>Coming Soon</span>
								)}
								{/* <!-- Genres (from genre_ids) --> */}
								<div className="flex flex-wrap gap-2 mb-6">
									{movie.genres &&
										movie.genres.map(
											(genre: {
												id: number;
												name: string;
											}) => (
												<span
													key={genre.id}
													className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 text-gray-200 px-3 py-1 rounded-full text-sm"
												>
													{genre.name}
												</span>
											)
										)}
								</div>
								{/* <!-- Overview --> */}
								<div className="mb-6">
									<h2 className="text-xl font-bold mb-2">Overview</h2>
									<p className="text-gray-300 max-h-28 overflow-y-auto">
										{movie.overview}
									</p>
								</div>
								{/* <!-- Technical Details --> */}
								<div className="mb-6 grid grid-cols-2 gap-4">
									<div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 p-4 rounded-lg">
										<h3 className="font-bold mb-2">Movie Details</h3>
										<div className="w-full text-sm">
											<span className="text-gray-400 pr-2">
												Original Language:
											</span>
											<span>{movie.original_language}</span>
										</div>
									</div>

									<div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 p-4 rounded-lg">
										<h3 className="font-bold mb-2">Voting Details</h3>
										<div className="flex items-center mb-2">
											<div className="w-full bg-gray-600 rounded-full h-2.5">
												<div
													className="bg-yellow-400 h-2 rounded-full"
													style={{ width: `${movie.vote_average * 10}%` }}
												></div>
											</div>
											<span className="ml-2 text-sm">
												{movie.vote_average}/10
											</span>
										</div>
										<p className="text-sm text-gray-300">
											Based on{" "}
											<span className="font-bold">{movie.vote_count}</span>{" "}
											votes
										</p>
									</div>
								</div>
							</div>
						</div>
						{/* <!-- Recommended Movies Section --> */}
						<div className="w-full lg:w-1/3">
							<div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 ">
								<h2 className="text-xl font-bold mb-4">Recommended</h2>
								<p className="text-xs text-gray-400 mb-4">
									Based on your viewing history and preferences
								</p>
								{/* <!-- Scrollable movie list --> */}
								<div
									className="overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 custom-scrollbar w-full pr-2"
									style={{ maxHeight: "calc(70vh - 180px)" }}
								>
									{/* <!-- Movie Card --> */}
									{recommendedMovies.map((movie: Movie, index: number) => (
										<div
											key={index}
											className="movie-card w-full bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-lg overflow-hidden shadow-lg"
										>
											<div className="flex">
												<Link
													className="w-1/2"
													to={`/movieDetails/${movie.id}`}
												>
													<div className="movie-poster w-full relative">
														<img
															alt={movie.title}
															className="w-full h-full object-cover"
															src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
														/>
													</div>
												</Link>
												<div className="w-2/3 p-3">
													<div className="flex items-center justify-between">
														<div className="mb-2">
															<h3 className="font-bold text-sm">
																{" "}
																{movie.title}
															</h3>
															<h5 className="text-xs ">
																{movie.original_title}
															</h5>

															{/* <i className="bx bxs-star text-yellow-400 text-xs"></i> */}
															<span className="text-xs ml-1 text-nowrap">
																<img
																	src="../../public/star.svg"
																	className="size-3 mb-1 mr-1 inline-block"
																	alt=""
																/>
																{Math.round(movie.vote_average)} / 10 based on{" "}
																<span className="font-bold text-gray-200">
																	{movie.vote_count}
																</span>
															</span>
														</div>
													</div>
													<p className="text-xs text-gray-400">
														{new Date(movie.release_date) <= new Date()
															? new Date(movie.release_date).getFullYear()
															: "Coming Soon"}
													</p>
													<div className="mt-2 flex flex-wrap gap-1">
														<span className="text-[10px] bg-gray-600/80 px-2 py-0.5 rounded-full">
															{movie.original_language}
														</span>
													</div>
													<p className="text-xs text-gray-400 mt-2 line-clamp-2">
														{movie.overview}
													</p>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
export default MovieDetails;
