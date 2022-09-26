export const dateParser = (timestamp: string) => {

	const dateObj = new Date(timestamp);

	const year = dateObj.getFullYear();

	const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);

	const date = ("0" + dateObj.getDate()).slice(-2);

	return `${date}.${month}.${year}`

}