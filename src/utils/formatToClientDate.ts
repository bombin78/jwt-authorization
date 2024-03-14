export const formatToClientDate = (data?: Date) => {
	return !data ? '' : new Date(data).toLocaleDateString();
};
