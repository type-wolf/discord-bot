const code = 'NO_COMPONENTS';

const message = {
	en: 'Component generation failed',
	ja: 'コンポーネントの生成に失敗しました',
} as const;

/**
 * @description Objects to inherit in case of unexplained errors
 **/
const NO_COMPONENTS = { code, message };

export default NO_COMPONENTS;
