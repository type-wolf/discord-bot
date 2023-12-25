const title = {
	en: 'User is a Bot',
	ja: 'ユーザがBotです',
} as const;

const message = {
	en: `The user who fired the event was a Bot, so the process was aborted`,
	ja: `イベントを発生させたユーザがBotだったので処理を中止しました`,
} as const;

const USER_IS_BOT = { title, message } as const;

export default USER_IS_BOT;
