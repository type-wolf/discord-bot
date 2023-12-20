import { DateTime } from 'luxon';

export type DateFormat = 'yyyy年LL月dd日(EEE)' | 'yyyy年LL月dd日' | 'yyyy/LL/dd (EEE)' | 'yyyy/LL/dd' | 'yyyyMMdd';
export type DatetimeFormat =
	| 'yyyy年LL月dd日(EEE) HH時mm分ss秒'
	| 'yyyy年LL月dd日HH時mm分ss秒'
	| 'yyyy/LL/dd/HH:mm:ss'
	| 'yyyy-LL-dd-HH:mm:ss'
	| 'yyyyMMddHHmmss';

export type GetDatetimeOptions = {
	locale?: string;
	inputFormat?: string;
};

const getDatetime = (input?: string, options?: GetDatetimeOptions) => {
	try {
		let date: DateTime;
		if (input) {
			if (options?.inputFormat) {
				date = DateTime.fromFormat(input, options.inputFormat, { locale: options?.locale || 'ja' });
			} else {
				date = DateTime.fromISO(input, { locale: options?.locale || 'ja' });
			}
		} else {
			date = DateTime.local().setLocale(options?.locale || 'ja');
		}

		if (!date.isValid) {
			throw new Error('Invalid date format');
		}

		return {
			date: {
				default: date.toFormat('yyyy/LL/dd'),
				format: (format: DateFormat) => date.toFormat(format),
				onlyNumber: date.toFormat('yyyyMMdd'),
			},
			timestamp: {
				unix: date.toSeconds(),
				ms: date.toMillis(),
			},
			datetime: {
				default: date,
				format: (format: DatetimeFormat) => date.toFormat(format),
			},
		};
	} catch (e) {
		if (e instanceof Error) {
			return undefined;
		}
	}
};

export default getDatetime;
