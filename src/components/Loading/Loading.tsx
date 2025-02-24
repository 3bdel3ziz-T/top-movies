import "./Loading.css";
function Loading({ isLoading }: { isLoading: boolean }) {
	if (isLoading) {
		return (
			<div className="overlay">
				<svg viewBox="25 25 50 50">
					<circle
						className=" stroke-indigo-600"
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
