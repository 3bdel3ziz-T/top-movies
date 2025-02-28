const Search = ({
	searchTerm,
	setSearchTerm,
}: {
	searchTerm: string;
	setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}) => {
	document.addEventListener("keydown", (e) => {
		if (e.key.toLowerCase() === "k" && e.ctrlKey) {
			console.log(e);
		}
	});
	return (
		<div className="search">
			<div>
				<img src="search.svg" alt="search" />

				<input
					type="text"
					placeholder="Search through thousands of movies"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>
		</div>
	);
};
export default Search;
