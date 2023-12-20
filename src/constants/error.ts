import type { ByLanguageMessage } from './message';

/**
 * @description Generics created to easily issue expected errors
 **/
export type ErrorCode = 'UNKNOWN_ERROR';

/**
 * @description Error Constant Props Type
 **/
type ErrorMessage = {
	code: ErrorCode;
	message: ByLanguageMessage;
};

/**
 * @description Objects to inherit in case of unexplained errors
 **/
const UNKNOWN_ERROR: ErrorMessage = {
	code: 'UNKNOWN_ERROR',
	message: {
		ja: '原因不明のエラーが発生しました',
		en: 'An error of unknown cause has occurred',
	},
} as const;

const ERRORS = {
	UNKNOWN_ERROR,
};

export default ERRORS;
