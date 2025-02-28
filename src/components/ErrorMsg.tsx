function ErrorMsg({ title = "", body = "" }: { title: string; body: string }) {
	if (title && body) {
		return (
			<div className="z-50 w-[380px] flex flex-col gap-3 font-medium h-auto fixed bottom-10 right-10 bg-red-100 p-3 rounded-xl">
				<div className="flex flex-row gap-3">
					<svg
						className="text-red-500 self-center w-5 h-5"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
							clip-rule="evenodd"
						></path>
					</svg>
					<div className="flex flex-col">
						<p className="font-bold text-lg text-red-600">{title}</p>
						<ul role="list" className="list-disc ml-4 text-red-500">
							<li>{body}</li>
						</ul>
					</div>
				</div>
			</div>
		);
	} else return <></>;
}

export default ErrorMsg;
