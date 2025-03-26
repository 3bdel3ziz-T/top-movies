function Loading({ isLoading }: { isLoading: boolean }) {
	if (isLoading) {
		return (
			<div className="backLay">
				<svg
					viewBox="25 25 50 50 "
					className="w-18 origin-center animate-spin duration-[2000ms] ease-in-out"
				>
					<circle
						style={{
							/* stroke: hsl(214, 97%, 59%); */
							strokeDasharray: "1, 200",
							strokeDashoffset: 0,
							strokeLinecap: "round",
						}}
						className=" fill-none stroke-2 animate-filling stroke-indigo-600"
						cx="50"
						cy="50"
						r="20"
					></circle>
				</svg>
			</div>
		);
	} else {
		return <></>;
	}
}

export default Loading;
