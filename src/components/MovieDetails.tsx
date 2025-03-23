import { Movie } from "../../public/types/movie";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { MovieDetailsContext } from "./Contexts/MovieDetailsContext";
function MovieDetails({ passMovieID }: { passMovieID: (id: string) => void }) {
	const { movieID } = useParams();
	useEffect(() => {
		passMovieID(movieID!);
	}, [movieID]);
	const navigate = useNavigate();
	const movie: Movie = useContext(MovieDetailsContext);
	console.log(movie);
	return (
		<>
			<div className="container h-[80vh] text-gray-100 justify-center bg-primary-2 rounded-xl shadow-2xl overflow-hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
				<button
					onClick={() => navigate(-1)}
					className="absolute top-4 right-4 w-10 h-10 text-4xl border-0 text-gray-200 mb-4 scale-120"
				>
					×
				</button>
				{/* <!-- Backdrop image (using backdrop_path) --> */}
				<div
					className="backdrop-image"
					style={
						{
							// backgroundImage: "url('https://via.placeholder.com/1920x1080')",
						}
					}
				></div>

				{/* <!-- Scrollable content container --> */}
				<div className="content-container  h-full overflow-y-auto p-6 relative z-10 custom-scrollbar">
					{/* <!-- Main Content --> */}
					<div className="flex flex-col lg:flex-row gap-8">
						{/* <!-- Movie Details Section --> */}
						<div className="lg:w-3/4">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								{/* <!-- Movie Poster (poster_path) --> */}
								<div className="md:col-span-1 mt-6">
									<div className="rounded-lg overflow-hidden shadow-lg aspect-[9/16] bg-gray-800">
										<img
											alt="Movie Poster"
											className="w-full h-auto"
											src={
												movie.poster_path
													? "https://image.tmdb.org/t/p/w500" +
													  movie.poster_path
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
								<div className="md:col-span-2">
									<div className="flex justify-start items-center mb-2">
										{/* <!-- Title --> */}
										<h1 className="text-left m-0 mr-2 text-3xl md:text-4xl font-bold">
											Interstellar
										</h1>
										{/* <!-- Adult content badge --> */}
										<span className="bg-red-600 text-white text-xs px-2 py-1 rounded mr-2">
											18+
										</span>
									</div>

									{/* <!-- Original title (if different) --> */}
									<div className="text-gray-400 mb-2">
										Original Title: <span className="italic">Interstellar</span>
									</div>

									<div className="flex items-center mb-4">
										{/* <!-- Vote average --> */}
										<div className="flex items-center bg-gray-700 rounded-lg px-3 py-1 mr-3">
											<span className="bx bxs-star text-yellow-400 mr-1">
												⭐
											</span>
											<span className="font-bold">8.6</span>
											<span className="text-gray-400 text-sm ml-1">/10</span>
										</div>
										{/* <!-- Release date --> */}
										<span className="text-gray-400">169 min | 2014-11-07</span>
									</div>

									{/* <!-- Genres (from genre_ids) --> */}
									<div className="flex flex-wrap gap-2 mb-6">
										<span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm">
											Adventure (12)
										</span>
										<span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm">
											Drama (18)
										</span>
										<span className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm">
											Sci-Fi (878)
										</span>
									</div>

									{/* <!-- Overview --> */}
									<div className="mb-6">
										<h2 className="text-xl font-bold mb-2">Overview</h2>
										<p className="text-gray-300">
											A team of explorers travel through a wormhole in space in
											an attempt to ensure humanity's survival. In Earth's
											future, a global crop blight and second Dust Bowl are
											slowly rendering the planet uninhabitable. Professor
											Brand, a brilliant NASA physicist, is working on plans to
											save mankind by transporting Earth's population to a new
											home via a wormhole.
										</p>
									</div>

									{/* <!-- Technical Details --> */}
									<div className="mb-6 grid grid-cols-2 gap-4">
										<div className="bg-gray-700 p-4 rounded-lg">
											<h3 className="font-bold mb-2">Movie Details</h3>
											<div className="w-full text-sm">
												<span className="text-gray-400 pr-2">
													Original Language:
												</span>
												<span>English (en)</span>
											</div>
										</div>

										<div className="bg-gray-700 p-4 rounded-lg">
											<h3 className="font-bold mb-2">Voting Details</h3>
											<div className="flex items-center mb-2">
												<div className="w-full bg-gray-600 rounded-full h-2.5">
													<div className="bg-yellow-400 h-2.5 rounded-full"></div>
												</div>
												<span className="ml-2 text-sm">8.6/10</span>
											</div>
											<p className="text-sm text-gray-300">
												Based on <span className="font-bold">8,245</span> votes
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* <!-- Recommended Movies Section --> */}
						<div className="lg:w-1/4 mt-8 lg:mt-0 hidden lg:block">
							<div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
								<div className="flex items-center justify-between mb-4">
									<h2 className="text-xl font-bold">Recommended</h2>
									<button className="text-xs text-primary hover:text-secondary transition-colors">
										See All
									</button>
								</div>

								<p className="text-xs text-gray-400 mb-4">
									Based on your viewing history and preferences
								</p>

								{/* <!-- Scrollable movie list --> */}
								<div
									className="overflow-y-auto custom-scrollbar pr-2"
									style={{ maxHeight: "calc(70vh - 180px)" }}
								>
									{/* <!-- Movie Card 1 --> */}
									<div className="movie-card bg-gray-700/80 rounded-lg overflow-hidden mb-4 shadow-lg">
										<div className="flex">
											<div className="movie-poster w-1/3 relative">
												<img
													alt="Inception"
													className="w-full h-full object-cover"
												/>
												<div className="hover-info">
													<button className="bg-primary/80 hover:bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center">
														<i className="bx bx-play"></i>
													</button>
												</div>
											</div>
											<div className="w-2/3 p-3">
												<div className="flex items-center justify-between">
													<h3 className="font-bold text-sm">Inception</h3>
													<div className="flex items-center">
														<i className="bx bxs-star text-yellow-400 text-xs"></i>
														<span className="text-xs ml-1">8.8</span>
													</div>
												</div>
												<p className="text-xs text-gray-400 mt-1">
													2010 | 148 min
												</p>
												<div className="mt-2 flex flex-wrap gap-1">
													<span className="text-[10px] bg-gray-600/80 px-2 py-0.5 rounded-full">
														Sci-Fi
													</span>
													<span className="text-[10px] bg-gray-600/80 px-2 py-0.5 rounded-full">
														Action
													</span>
												</div>
												<p className="text-xs text-gray-400 mt-2 line-clamp-2">
													A thief who steals corporate secrets through the use
													of dream-sharing technology.
												</p>
											</div>
										</div>
									</div>

									{/* <!-- Movie Card 2 --> */}
									<div className="movie-card bg-gray-700/80 rounded-lg overflow-hidden mb-4 shadow-lg">
										<div className="flex">
											<div className="movie-poster w-1/3 relative">
												<img
													alt="The Martian"
													className="w-full h-full object-cover"
												/>
												<div className="hover-info">
													<button className="bg-primary/80 hover:bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center">
														<i className="bx bx-play"></i>
													</button>
												</div>
											</div>
											<div className="w-2/3 p-3">
												<div className="flex items-center justify-between">
													<h3 className="font-bold text-sm">The Martian</h3>
													<div className="flex items-center">
														<i className="bx bxs-star text-yellow-400 text-xs"></i>
														<span className="text-xs ml-1">8.0</span>
													</div>
												</div>
												<p className="text-xs text-gray-400 mt-1">
													2015 | 144 min
												</p>
												<div className="mt-2 flex flex-wrap gap-1">
													<span className="text-[10px] bg-gray-600/80 px-2 py-0.5 rounded-full">
														Sci-Fi
													</span>
													<span className="text-[10px] bg-gray-600/80 px-2 py-0.5 rounded-full">
														Adventure
													</span>
												</div>
												<p className="text-xs text-gray-400 mt-2 line-clamp-2">
													An astronaut becomes stranded on Mars and must find a
													way to survive.
												</p>
											</div>
										</div>
									</div>

									{/* <!-- Movie Card 3 --> */}
									<div className="movie-card bg-gray-700/80 rounded-lg overflow-hidden mb-4 shadow-lg">
										<div className="flex">
											<div className="movie-poster w-1/3 relative">
												<img
													alt="Gravity"
													className="w-full h-full object-cover"
												/>
												<div className="hover-info">
													<button className="bg-primary/80 hover:bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center">
														<i className="bx bx-play"></i>
													</button>
												</div>
											</div>
											<div className="w-2/3 p-3">
												<div className="flex items-center justify-between">
													<h3 className="font-bold text-sm">Gravity</h3>
													<div className="flex items-center">
														<i className="bx bxs-star text-yellow-400 text-xs"></i>
														<span className="text-xs ml-1">7.7</span>
													</div>
												</div>
												<p className="text-xs text-gray-400 mt-1">
													2013 | 91 min
												</p>
												<div className="mt-2 flex flex-wrap gap-1">
													<span className="text-[10px] bg-gray-600/80 px-2 py-0.5 rounded-full">
														Sci-Fi
													</span>
													<span className="text-[10px] bg-gray-600/80 px-2 py-0.5 rounded-full">
														Thriller
													</span>
												</div>
												<p className="text-xs text-gray-400 mt-2 line-clamp-2">
													Two astronauts work together to survive after a
													catastrophe destroys their shuttle.
												</p>
											</div>
										</div>
									</div>

									{/* <!-- Movie Card 4 --> */}
									<div className="movie-card bg-gray-700/80 rounded-lg overflow-hidden mb-4 shadow-lg">
										<div className="flex">
											<div className="movie-poster w-1/3 relative">
												<img
													alt="Arrival"
													className="w-full h-full object-cover"
												/>
												<div className="hover-info">
													<button className="bg-primary/80 hover:bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center">
														<i className="bx bx-play"></i>
													</button>
												</div>
											</div>
											<div className="w-2/3 p-3">
												<div className="flex items-center justify-between">
													<h3 className="font-bold text-sm">Arrival</h3>
													<div className="flex items-center">
														<i className="bx bxs-star text-yellow-400 text-xs"></i>
														<span className="text-xs ml-1">7.9</span>
													</div>
												</div>
												<p className="text-xs text-gray-400 mt-1">
													2016 | 116 min
												</p>
												<div className="mt-2 flex flex-wrap gap-1">
													<span className="text-[10px] bg-gray-600/80 px-2 py-0.5 rounded-full">
														Sci-Fi
													</span>
													<span className="text-[10px] bg-gray-600/80 px-2 py-0.5 rounded-full">
														Drama
													</span>
												</div>
												<p className="text-xs text-gray-400 mt-2 line-clamp-2">
													A linguist works with the military to communicate with
													alien lifeforms.
												</p>
											</div>
										</div>
									</div>

									{/* <!-- Movie Card 5 --> */}
									<div className="movie-card bg-gray-700/80 rounded-lg overflow-hidden mb-4 shadow-lg">
										<div className="flex">
											<div className="movie-poster w-1/3 relative">
												<img
													alt="Dune"
													className="w-full h-full object-cover"
												/>
												<div className="hover-info">
													<button className="bg-primary/80 hover:bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center">
														<i className="bx bx-play"></i>
													</button>
												</div>
											</div>
											<div className="w-2/3 p-3">
												<div className="flex items-center justify-between">
													<h3 className="font-bold text-sm">Dune</h3>
													<div className="flex items-center">
														<i className="bx bxs-star text-yellow-400 text-xs"></i>
														<span className="text-xs ml-1">8.1</span>
													</div>
												</div>
												<p className="text-xs text-gray-400 mt-1">
													2021 | 155 min
												</p>
												<div className="mt-2 flex flex-wrap gap-1">
													<span className="text-[10px] bg-gray-600/80 px-2 py-0.5 rounded-full">
														Sci-Fi
													</span>
													<span className="text-[10px] bg-gray-600/80 px-2 py-0.5 rounded-full">
														Adventure
													</span>
												</div>
												<p className="text-xs text-gray-400 mt-2 line-clamp-2">
													A noble family becomes embroiled in a war for control
													over the galaxy's most valuable resource.
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* <!-- NEW: Trending Now Movies Slider at the bottom --> */}
					<div className="mt-10 mb-4">
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-2xl font-bold">Trending Now</h2>
							<button className="text-sm text-primary hover:text-secondary transition-colors flex items-center">
								View All <i className="bx bx-chevron-right ml-1"></i>
							</button>
						</div>

						{/* <!-- Trending movies slider --> */}
						<div className="relative">
							{/* <!-- Left scroll button --> */}
							<button className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-900/80 hover:bg-gray-900 rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
								<i className="bx bx-chevron-left text-xl"></i>
							</button>

							{/* <!-- Right scroll button --> */}
							<button className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-900/80 hover:bg-gray-900 rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
								<i className="bx bx-chevron-right text-xl"></i>
							</button>

							{/* <!-- Scrollable container --> */}
							<div className="overflow-x-auto custom-scrollbar py-4 px-2">
								<div className="flex gap-4">
									{/* <!-- Trending Movie 1 --> */}
									<div className="trending-card flex-shrink-0 w-44 bg-gray-700/80 rounded-lg overflow-hidden shadow-lg">
										<div className="relative">
											<img
												alt="Trending Movie"
												className="w-full h-64 object-cover"
											/>
											<div className="trending-overlay absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
												<div>
													<div className="flex items-center mb-1">
														<i className="bx bxs-star text-yellow-400 text-xs mr-1"></i>
														<span className="text-xs">9.2</span>
													</div>
													<button className="bg-primary hover:bg-secondary text-white text-xs rounded-full px-3 py-1 flex items-center">
														<i className="bx bx-play text-xs mr-1"></i> Watch
													</button>
												</div>
											</div>
										</div>
										<div className="p-3">
											<h3 className="font-bold text-sm truncate">
												Oppenheimer
											</h3>
											<p className="text-xs text-gray-400">2023 | Biography</p>
										</div>
									</div>

									{/* <!-- Trending Movie 2 --> */}
									<div className="trending-card flex-shrink-0 w-44 bg-gray-700/80 rounded-lg overflow-hidden shadow-lg">
										<div className="relative">
											<img
												alt="Trending Movie"
												className="w-full h-64 object-cover"
											/>
											<div className="trending-overlay absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
												<div>
													<div className="flex items-center mb-1">
														<i className="bx bxs-star text-yellow-400 text-xs mr-1"></i>
														<span className="text-xs">8.7</span>
													</div>
													<button className="bg-primary hover:bg-secondary text-white text-xs rounded-full px-3 py-1 flex items-center">
														<i className="bx bx-play text-xs mr-1"></i> Watch
													</button>
												</div>
											</div>
										</div>
										<div className="p-3">
											<h3 className="font-bold text-sm truncate">Barbie</h3>
											<p className="text-xs text-gray-400">2023 | Comedy</p>
										</div>
									</div>

									{/* <!-- Trending Movie 3 --> */}
									<div className="trending-card flex-shrink-0 w-44 bg-gray-700/80 rounded-lg overflow-hidden shadow-lg">
										<div className="relative">
											<img
												alt="Trending Movie"
												className="w-full h-64 object-cover"
											/>
											<div className="trending-overlay absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
												<div>
													<div className="flex items-center mb-1">
														<i className="bx bxs-star text-yellow-400 text-xs mr-1"></i>
														<span className="text-xs">8.5</span>
													</div>
													<button className="bg-primary hover:bg-secondary text-white text-xs rounded-full px-3 py-1 flex items-center">
														<i className="bx bx-play text-xs mr-1"></i> Watch
													</button>
												</div>
											</div>
										</div>
										<div className="p-3">
											<h3 className="font-bold text-sm truncate">The Killer</h3>
											<p className="text-xs text-gray-400">2023 | Thriller</p>
										</div>
									</div>

									{/* <!-- Trending Movie 4 --> */}
									<div className="trending-card flex-shrink-0 w-44 bg-gray-700/80 rounded-lg overflow-hidden shadow-lg">
										<div className="relative">
											<img
												alt="Trending Movie"
												className="w-full h-64 object-cover"
											/>
											<div className="trending-overlay absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
												<div>
													<div className="flex items-center mb-1">
														<i className="bx bxs-star text-yellow-400 text-xs mr-1"></i>
														<span className="text-xs">8.9</span>
													</div>
													<button className="bg-primary hover:bg-secondary text-white text-xs rounded-full px-3 py-1 flex items-center">
														<i className="bx bx-play text-xs mr-1"></i> Watch
													</button>
												</div>
											</div>
										</div>
										<div className="p-3">
											<h3 className="font-bold text-sm truncate">
												Killers of the Flower Moon
											</h3>
											<p className="text-xs text-gray-400">2023 | Crime</p>
										</div>
									</div>

									{/* <!-- Trending Movie 5 --> */}
									<div className="trending-card flex-shrink-0 w-44 bg-gray-700/80 rounded-lg overflow-hidden shadow-lg">
										<div className="relative">
											<img
												alt="Trending Movie"
												className="w-full h-64 object-cover"
											/>
											<div className="trending-overlay absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
												<div>
													<div className="flex items-center mb-1">
														<i className="bx bxs-star text-yellow-400 text-xs mr-1"></i>
														<span className="text-xs">7.8</span>
													</div>
													<button className="bg-primary hover:bg-secondary text-white text-xs rounded-full px-3 py-1 flex items-center">
														<i className="bx bx-play text-xs mr-1"></i> Watch
													</button>
												</div>
											</div>
										</div>
										<div className="p-3">
											<h3 className="font-bold text-sm truncate">Napoleon</h3>
											<p className="text-xs text-gray-400">2023 | Historical</p>
										</div>
									</div>

									{/* <!-- Trending Movie 6 --> */}
									<div className="trending-card flex-shrink-0 w-44 bg-gray-700/80 rounded-lg overflow-hidden shadow-lg">
										<div className="relative">
											<img
												alt="Trending Movie"
												className="w-full h-64 object-cover"
											/>
											<div className="trending-overlay absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
												<div>
													<div className="flex items-center mb-1">
														<i className="bx bxs-star text-yellow-400 text-xs mr-1"></i>
														<span className="text-xs">8.3</span>
													</div>
													<button className="bg-primary hover:bg-secondary text-white text-xs rounded-full px-3 py-1 flex items-center">
														<i className="bx bx-play text-xs mr-1"></i> Watch
													</button>
												</div>
											</div>
										</div>
										<div className="p-3">
											<h3 className="font-bold text-sm truncate">
												The Marvels
											</h3>
											<p className="text-xs text-gray-400">2023 | Action</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* <!-- Trailer Modal (Hidden by default) --> */}
			<div
				id="trailerModal"
				className="fixed inset-0 bg-black bg-opacity-80 z-50 items-center justify-center hidden"
			>
				<div className="relative w-full max-w-4xl mx-4">
					<button
						id="closeModal"
						className="absolute -top-10 right-0 text-white text-2xl"
					>
						<i className="bx bx-x"></i>
					</button>
					<div className="aspect-w-16 aspect-h-9 bg-black">
						<div className="w-full h-0 pb-[56.25%] relative">
							{/* <!-- YouTube embed would go here --> */}
							<div className="absolute inset-0 flex items-center justify-center bg-gray-800">
								<p className="text-white">Trailer would play here</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default MovieDetails;
