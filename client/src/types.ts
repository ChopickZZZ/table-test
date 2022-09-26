type HeaderText = 'Дата' | 'Название' | 'Количество' | 'Расстояние'
type HeaderValue = 'date' | 'title' | 'amount' | 'distance'

type ConditionText = 'Равно' | 'Содержит' | 'Больше' | 'Меньше'
type ConditionValue = 'equal' | 'contains' | 'more' | 'less'

export interface Header {
	text: HeaderText,
	value: HeaderValue
}

export interface Condition {
	text: ConditionText,
	value: ConditionValue
}

export interface Filter {
	column: keyof Item,
	condition: keyof Condition[],
	inputValue: string
}

export interface Item {
	id: number,
	cur_date: string,
	date: string,
	title: string,
	amount: number,
	distance: number
}

export type Order = 'to-top' | 'to-bottom'