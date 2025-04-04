import { useState, useContext } from "react";
import { FilterContext } from "./Contexts/FilterContext";
const Filter = () => {
	const [open, setOpen] = useState(false);
	const { filters, setFilters } = useContext(FilterContext);
	const options: { id: number; name: string }[] = [
		{ id: 28, name: "Action" },
		{ id: 12, name: "Adventure" },
		{ id: 16, name: "Animation" },
		{ id: 80, name: "Crime" },
		{ id: 10751, name: "Family" },
		{ id: 36, name: "History" },
		{ id: 10749, name: "Romance" },
		{ id: 10752, name: "War" },
		{ id: 35, name: "Comedy" },
		{ id: 18, name: "Drama" },
		{ id: 27, name: "Horror" },
	];
	return (
		<div>
			<button onClick={() => setOpen(!open)}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 26 24"
				>
					<path d="M21 3H5a1 1 0 0 0-1 1v2.59c0 .523.213 1.037.583 1.407L10 13.414V21a1.001 1.001 0 0 0 1.447.895l4-2c.339-.17.553-.516.553-.895v-5.586l5.417-5.417c.37-.37.583-.884.583-1.407V4a1 1 0 0 0-1-1zm-6.707 9.293A.996.996 0 0 0 14 13v5.382l-2 1V13a.996.996 0 0 0-.293-.707L6 6.59V5h14.001l.002 1.583-5.71 5.71z"></path>
				</svg>
			</button>
			<div
				className={`translate-y-4 ${
					open ? "flex translate-y-0" : "hidden"
				} p-3 h-fit absolute duration-150 grid grid-cols-2 md:grid-cols-3 gap-2 bg-primary-2 rounded-lg right-0 top-full`}
			>
				{options.map((option: { id: number; name: string }) => (
					<label
						className={`${
							filters.some((item) => item.id === option.id)
								? "bg-primary text-secondary"
								: "bg-primary-2"
						} flex relative items-center active:scale-105 justify-center gap-2 cursor-pointer text-gray-200 text-left duration-150  hover:text-secondary py-2 w-full rounded-md px-4`}
						htmlFor={`${option.name}`}
						key={option.id}
					>
						<input
							onChange={(e) => {
								if (e.target.checked) {
									setFilters([
										...filters,
										{ id: option.id, name: option.name },
									]);
								} else {
									setFilters(filters.filter((item) => item.id !== option.id));
								}
							}}
							type="checkbox"
							className="hidden"
							name="option"
							id={option.name}
							value={option.name}
						/>
						{option.name}
					</label>
				))}
				<button
					onClick={() => setFilters([])}
					className="flex relative items-center active:scale-105 justify-center gap-2 cursor-pointer text-left duration-150 text-secondary py-2 w-full rounded-md px-4"
				>
					clear
				</button>
			</div>
		</div>
	);
};

export default Filter;
