export interface Header {
	text: string,
	value: string
}

export interface Item {
	id: number,
	date: string,
	title: string,
	amount: number,
	distance: number
}

export type Order = 'to-top' | 'to-bottom'