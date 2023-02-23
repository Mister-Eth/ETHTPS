import { DataType, TimeInterval } from 'ethtps.api.client'

export function toShortString(interval: TimeInterval) {
	switch (interval) {
		case TimeInterval.All:
			return 'All'
		case TimeInterval.Instant:
			return 'Instant'
		case TimeInterval.OneDay:
			return '1d'
		case TimeInterval.OneHour:
			return '1h'
		case TimeInterval.OneMinute:
			return '1m'
		case TimeInterval.OneMonth:
			return '1mo'
		case TimeInterval.OneYear:
			return '1y'
		default:
			return 'Other'
	}
}

export function dataTypeToString(type: DataType) {
	switch (type) {
		case DataType.Tps:
			return 'TPS'
		case DataType.Gps:
			return 'GPS'
		default:
			return 'GTPS'
	}
}

// long string > short string
// example: OneMinute > 1m
export function toShortString_2(intervalName: string) {
	switch (intervalName) {
		case 'OneDay':
			return '1d'
		case 'OneHour':
			return '1h'
		case 'OneMinute':
			return '1m'
		case 'OneMonth':
			return '1mo'
		case 'OneYear':
			return '1y'
		case 'OneWeek':
			return '1w'
		default:
			return intervalName
	}
}

export function fromShortString_2(intervalName: string) {
	switch (intervalName) {
		case '1d':
			return 'OneDay'
		case '1h':
			return 'OneHour'
		case '1m':
			return 'OneMinute'
		case '1mo':
			return 'OneMonth'
		case '1y':
			return 'OneYear'
		case '1w':
			return 'OneWeek'
		default:
			return intervalName
	}
}
