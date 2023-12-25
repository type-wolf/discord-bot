const code = 'UNKNOWN_ERROR';

const message = {
	en: 'An error of unknown cause has occurred',
	ja: '原因不明のエラーが発生しました',
} as const;

/**
 * @description Objects to inherit in case of unexplained errors
 **/
const UNKNOWN = { code, message };

export default UNKNOWN;
