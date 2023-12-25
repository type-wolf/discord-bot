const title = {
	en: 'No one to create event schedule',
	ja: 'イベントスケジュールの作成者がいない',
};

const toMessage = (eventName: string) => {
	return {
		en: `Processing aborted because the user (state.creator) that created the '${eventName}' schedule is 'null`,
		ja: `'${eventName}'のスケジュールを作成したユーザ(state.creator)が’null'なので処理を中止しました`,
	};
};

const NO_SCHEDULE_CREATOR = { title, toMessage } as const;

export default NO_SCHEDULE_CREATOR;
