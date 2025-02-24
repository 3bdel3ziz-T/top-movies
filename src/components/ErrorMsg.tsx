export default function ErrorMsg({ error = "" }: { error: string }) {
	if (error) {
		return <p className="text-red-600 text-lg">{error}</p>;
	} else return <></>;
}
