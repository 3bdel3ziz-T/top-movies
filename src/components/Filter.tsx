import { useState, useContext } from "react";
import { FilterContext } from "./Contexts/FilterContext";
const Filter = () => {
	const [open, setOpen] = useState(false);
	const { filters, setFilters } = useContext(FilterContext);
	const options: string[] = ["adults", "action", "drama", "comedy", "romance"];
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
				} p-3 h-fit absolute duration-150 flex-col md:flex-row gap-2 bg-primary-2 rounded-lg right-0 top-full`}
			>
				{options.map((option: string) => (
					<label
						className={`${filters.includes(option) ? "bg-primary text-secondary" : ""} flex relative items-center justify-center gap-2 cursor-pointer text-gray-200 text-left duration-150 hover:bg-primary hover:text-secondary py-2 w-full rounded-md px-4`}
						htmlFor={`${option}`}
						key={option}
					>
						<input
							onChange={(e) => {
								if (e.target.checked) {
									setFilters([...filters, option]);
								} else {
									setFilters(filters.filter((filter) => filter !== option));
								}
							}}
							type="checkbox"
							className="accent-purple-600 bg-primary-2"
							name="option"
							id={option}
						/>
						{option}
					</label>
				))}
			</div>
		</div>
	);
};

export default Filter;
