import UNKNOWN from './unknown';

/**
 * @description Generics created to easily issue expected errors
 **/
export type ErrorCode = 'UNKNOWN';

/**
 * @description Error Constant Props Type
 **/
export type ErrorMessage = {
	code: ErrorCode;
	message: {
		en: string;
		ja: string;
	};
};

export { UNKNOWN };
