const title = {
	en: 'The message author is bot',
	ja: 'メッセージの作成者はBotです',
} as const;

const toMessage = (url?: string) => {
	return {
		en: `Processing was aborted because the message creator (poster) is a Bot ${url || ''}`,
		ja: `メッセージの作成者（投稿者）がBotなので処理を中止しました ${url || ''}`,
	} as const;
};

const MESSAGE_AUTHOR_IS_BOT = { title, toMessage } as const;

export default MESSAGE_AUTHOR_IS_BOT;
