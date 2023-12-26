import { MAINTENANCE, USER_IS_BOT, MESSAGE_AUTHOR_IS_BOT, NO_SCHEDULE_CREATOR } from './info';
import { UNKNOWN, NO_COMPONENTS } from './error';

export const INFOS = {
	MAINTENANCE,
	USER_IS_BOT,
	MESSAGE_AUTHOR_IS_BOT,
	NO_SCHEDULE_CREATOR,
};

export const ERRORS = { UNKNOWN, NO_COMPONENTS };
export * from './info';
export * from './error';
export default { INFOS, ERRORS };
