type ErrorProps = {
	error: string,
}

export const ErrorMessage = (props: ErrorProps) => {
	const {
		error = '',
	} = props;

	return error && (
		<p className="text-red-500 mt-2 mb-5 text-small">
			{error}
		</p>
	);
};
