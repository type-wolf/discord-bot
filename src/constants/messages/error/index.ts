import UNKNOWN from './unknown';
import NO_COMPONENTS from './noComponents';

/**
 * @description Generics created to easily issue expected errors
 **/
export type ErrorCode = 'UNKNOWN' | 'NO_COMPONENTS';

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

export { UNKNOWN, NO_COMPONENTS };
