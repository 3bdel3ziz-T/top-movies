export default function ErrorMsg({
	error = "Something went wrong",
}: {
	error: string;
}) {
	console.log(error);
	return <p className="text-red-600 text-lg">{error}</p>;
}
