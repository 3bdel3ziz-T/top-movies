import Filter from "./Filter";
import { useState, useEffect } from "react";

function Search({
	searchTerm,
	setSearchTerm,
}: {
	searchTerm: string;
	setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}) {
	const [searchText, setSearchText] = useState<string>("");
	const [delay, setDelay] = useState<number>(500); // Default delay of 500ms

	useEffect(() => {
		// Delay updating searchTerm when searchText changes to avoid too many API calls
		// and to provide a better user experience
		setDelay((prevDelay) => {
			if (searchText.length > 0 && searchText.length < 3) {
				return prevDelay + 300; // Delay of 500ms for short inputs
			} else if (searchText.length >= 3) {
				return prevDelay + 100; // Delay of 100ms for longer inputs
			}
			return prevDelay; // Keep the previous delay for empty input
		});
		const handler = setTimeout(() => {
			if (searchText !== searchTerm) {
				setSearchTerm(searchText);
			}
		}, delay); // Delay the searchTerm update

		return () => {
			clearTimeout(handler);
			setDelay(500); // Reset delay to default when component unmounts
		};
	}, [searchText]);

	return (
		<div className="search">
			<div className="search-container">
				<img src="search.svg" alt="search" />

				<input
					type="text"
					placeholder="Search through thousands of movies"
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
				/>
				<Filter />
			</div>
		</div>
	);
}
export default Search;
