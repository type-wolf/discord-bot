import { type Guild, TextChannel, type User, type ClientUser, type PartialUser, type MessageOptions } from 'discord.js';
import getDatetime from './getDatetime';
import getChannelsWithCache from './getChannels';
import type { EventNames } from '../constants/eventName';
import type { EventActions } from './maintenanceManager';
import { LOGCHANNEL_ID } from '../constants/id';
import { MIDGET_LAMP, WHITE_CHECK_MARK, WARNING, ROTATING_LIGHT, X, HAMMER } from '../constants/emoji';

enum LogLevel {
	INFO = 'INFO',
	SUCCESS = 'SUCCESS',
	WARNING = 'WARNING',
	DENGER = 'DENGER',
	ERROR = 'ERROR',
	DEBUG = 'DEBUG',
}

const STATSU_EMOJI_MAP = {
	INFO: MIDGET_LAMP,
	SUCCESS: WHITE_CHECK_MARK,
	WARNING: WARNING,
	DENGER: ROTATING_LIGHT,
	ERROR: X,
	DEBUG: HAMMER,
};

/**
 * Defines the options for customizing log messages in the Logger class.
 */
export type LoggerOptions<E extends EventNames, A extends keyof EventActions[E]> = {
	/**
	 * The name of the event associated with the log.
	 */
	event?: E;

	/**
	 * object of the user issuing this log
	 */
	user?: User | ClientUser | PartialUser;

	/**
	 * ID of the user issuing this log
	 */
	userId?: string;

	/**
	 * Name of user issuing this log
	 */
	username?: string;

	/**
	 * The name of the action that triggered the log.
	 */
	action?: A;

	/**
	 * Function name that triggered the log call
	 */
	func?: string;

	/**
	 * Identifies the agent (e.g., mobile, PC, app, browser) that performed the actions leading to the log.
	 */
	agent?: string;

	/**
	 * The date and time when the log was created. If not provided, the class will generate it.
	 */
	datetime?: string;

	/**
	 * Optional settings for posting the log to a Discord channel.
	 * If set, the log is posted to the specified `guild` and `channel`.
	 */
	sendToLogChannel?: {
		/**
		 * The guild where the log should be posted. If null, the submission is aborted.
		 */
		guild: Guild | null;

		/**
		 * The specific channel within the guild where the log should be posted.
		 * Can be either a `TextChannel` object or a channel ID string.
		 */
		channel?: TextChannel | string;

		/**
		 * Additional Discord message options, such as embeds, components, files, and attachments.
		 */
		options?: {
			embed?: MessageOptions['embeds'];
			components?: MessageOptions['components'];
			files?: MessageOptions['files'];
			attachments?: MessageOptions['attachments'];
		};
	};
};

/**
 * Logger class for outputting various levels of logs to the console and optionally to a Discord log channel.
 */
export default class Logger {
	/**
	 * ------------------------------------------------------------------------------------
	 * @description Logs a message with a specified log level, user, and optional additional options.
	 * ------------------------------------------------------------------------------------
	 * @param {LogLevel} level - The log level (e.g., INFO, SUCCESS, WARNING, ERROR, DEBUG).
	 * ------------------------------------------------------------------------------------
	 * @param {User | ClientUser | PartialUser} user - The user associated with the log.
	 * ------------------------------------------------------------------------------------
	 * @param {LoggerOptions} [options] - Optional parameters for additional log details.
	 * ------------------------------------------------------------------------------------
	 */
	private static log<E extends EventNames, A extends keyof EventActions[E]>(
		level: LogLevel,
		title: string,
		message: string,
		options?: LoggerOptions<E, A>
	) {
		if (options?.sendToLogChannel) {
			const res = sendLogger(level, title, message, options);
			return res;
		}
		print(level, title, message, options);
		return;
	}

	/**
	 * ------------------------------------------------------------------------------------
	 * @description Logs an informational message.
	 * ------------------------------------------------------------------------------------
	 * @param {User | ClientUser | PartialUser} user - The user associated with the log.
	 * ------------------------------------------------------------------------------------
	 * @param {LoggerOptions} [options] - Optional parameters for additional log details.
	 * ------------------------------------------------------------------------------------
	 */
	static info<E extends EventNames, A extends keyof EventActions[E]>(
		title: string,
		message: string,
		options?: LoggerOptions<E, A>
	) {
		Logger.log(LogLevel.INFO, title, message, options);
	}

	/**
	 * ------------------------------------------------------------------------------------
	 * @description Logs a success message.
	 * ------------------------------------------------------------------------------------
	 * @param {User | ClientUser | PartialUser} user - The user associated with the log.
	 * ------------------------------------------------------------------------------------
	 * @param {LoggerOptions} [options] - Optional parameters for additional log details.
	 * ------------------------------------------------------------------------------------
	 */
	static success<E extends EventNames, A extends keyof EventActions[E]>(
		title: string,
		message: string,
		options?: LoggerOptions<E, A>
	) {
		Logger.log(LogLevel.SUCCESS, title, message, options);
	}

	/**
	 * ------------------------------------------------------------------------------------
	 * @description Logs a debug message.
	 * ------------------------------------------------------------------------------------
	 * @param {User | ClientUser | PartialUser} user - The user associated with the log.
	 * ------------------------------------------------------------------------------------
	 * @param {LoggerOptions} [options] - Optional parameters for additional log details.
	 * ------------------------------------------------------------------------------------
	 */
	static debug<E extends EventNames, A extends keyof EventActions[E]>(
		title: string,
		message: string,
		options?: LoggerOptions<E, A>
	) {
		Logger.log(LogLevel.DEBUG, title, message, options);
	}

	/**
	 * ------------------------------------------------------------------------------------
	 * @description Logs a warning message.
	 * ------------------------------------------------------------------------------------
	 * @param {User | ClientUser | PartialUser} user - The user associated with the log.
	 * ------------------------------------------------------------------------------------
	 * @param {LoggerOptions} [options] - Optional parameters for additional log details.
	 * ------------------------------------------------------------------------------------
	 */
	static warning<E extends EventNames, A extends keyof EventActions[E]>(
		title: string,
		message: string,
		options?: LoggerOptions<E, A>
	) {
		Logger.log(LogLevel.WARNING, title, message, options);
	}

	/**
	 * ------------------------------------------------------------------------------------
	 * @description Logs a danger message.
	 * ------------------------------------------------------------------------------------
	 * @param {User | ClientUser | PartialUser} user - The user associated with the log.
	 * ------------------------------------------------------------------------------------
	 * @param {LoggerOptions} [options] - Optional parameters for additional log details.
	 * ------------------------------------------------------------------------------------
	 */
	static danger<E extends EventNames, A extends keyof EventActions[E]>(
		title: string,
		message: string,
		options?: LoggerOptions<E, A>
	) {
		Logger.log(LogLevel.DENGER, title, message, options);
	}

	/**
	 * ------------------------------------------------------------------------------------
	 * @description Logs an error message.
	 * ------------------------------------------------------------------------------------
	 * @param {User | ClientUser | PartialUser} user - The user associated with the log.
	 * ------------------------------------------------------------------------------------
	 * @param {LoggerOptions} [options] - Optional parameters for additional log details.
	 * ------------------------------------------------------------------------------------
	 */
	static error<E extends EventNames, A extends keyof EventActions[E]>(
		title: string,
		message: string,
		options?: LoggerOptions<E, A>
	) {
		Logger.log(LogLevel.ERROR, title, message, options);
	}
}

const line = `----------------------------------`;

/**
 * ------------------------------------------------------------------------------------
 * @description Outputs a formatted log message to the console based on the provided log level, user, and optional logger options.
 * ------------------------------------------------------------------------------------
 * @param {LogLevel} level - The log level for the message.
 * ------------------------------------------------------------------------------------
 * @param {User | ClientUser | PartialUser} user - The user associated with the log message.
 * ------------------------------------------------------------------------------------
 * @param {LoggerOptions} [options] - Optional parameters to customize the log message.
 * ------------------------------------------------------------------------------------
 * @mark
 * This function formats a log message including details like the user's ID, username, the specified status, event name, action name, agent, message, and datetime. It then outputs the message to the console using an appropriate console method based on the specified status in options (if any). The status can be 'Info', 'Success', 'Warning', 'Error', or 'Debug', and if no status is specified, the default `console.log` is used.
 * - If `options.status` is 'Info', `console.info` is used.
 * - If `options.status` is 'Success', `console.log` is used.
 * - If `options.status` is 'Warning', `console.warn` is used.
 * - If `options.status` is 'Error', `console.error` is used.
 * - If `options.status` is 'Debug', `console.debug` is used.
 * ------------------------------------------------------------------------------------
 */

function print<E extends EventNames, A extends keyof EventActions[E]>(
	level: LogLevel,
	_title: string,
	_message: string,
	options?: LoggerOptions<E, A>
) {
	// Generate content
	const emoji = STATSU_EMOJI_MAP[level];
	const title = `Title: ${emoji}${_title || 'No Title'}`;
	const buildOptionalString = (label: string, value?: string) => (value ? `${label}: ${value}` : '');
	const actionUser = buildOptionalString('User', options?.user?.id || options?.userId);
	const actionUserTag = buildOptionalString(
		'UserTag',
		options?.username || options?.user?.tag || options?.user?.username || ''
	);
	const status = buildOptionalString('Status', level);
	const eventName = buildOptionalString('Event', options?.event);
	const actionName = buildOptionalString('Action', options?.action?.toString());
	const functionName = buildOptionalString('Function', options?.func);
	const agent = buildOptionalString('Agent', options?.agent);
	const message = buildOptionalString('Message', _message);
	const datetime = `Datetime: ${options?.datetime || getDatetime()?.datetime.format('yyyy-LL-dd-HH:mm:ss')}`;
	// Filter out empty strings
	const contentParts = [
		title,
		actionUser,
		actionUserTag,
		status,
		eventName,
		actionName,
		functionName,
		agent,
		message,
		datetime,
	].filter((part) => part !== '');
	const content = [line, ...contentParts].join('\n');

	// Output switched by status
	if (level === 'INFO' || level === 'SUCCESS') {
		console.info(content);
		return;
	}
	if (level === 'WARNING' || level === 'DENGER') {
		console.warn(content);
		return;
	}
	if (level === 'ERROR') {
		console.error(content);
		return;
	}
	if (level === 'DEBUG') {
		console.debug(content);
		return;
	}
}

/**
 * ------------------------------------------------------------------------------------
 * @description Asynchronously posts log details to a specified Discord channel.
 * ------------------------------------------------------------------------------------
 * @param {LogLevel} level - The log level for the message.
 * ------------------------------------------------------------------------------------
 * @param {User | ClientUser | PartialUser} user - The user associated with the log message.
 * ------------------------------------------------------------------------------------
 * @param {LoggerOptions} options - Parameters to customize the log message, including Discord channel details.
 * ------------------------------------------------------------------------------------
 * @returns An object indicating whether an error occurred during the log submission.
 * ------------------------------------------------------------------------------------
 * @mark
 * This function posts a formatted log message to a Discord channel specified in the `options.sendToLogChannel`. It constructs a message including user, status, event name, action name, agent, message, and datetime details. If the guild or channel is not correctly specified in the options, it logs a warning or error message using the `print` function.
 * ------------------------------------------------------------------------------------
 * @mark
 * The function handles the following scenarios:
 * - If `options.sendToLogChannel` is not defined or `options.sendToLogChannel.guild` is null, it logs a warning and aborts the submission.
 * - If the specified Discord channel is not found or undefined, it throws an error.
 * - On successful execution, it returns an object with `isError` set to false.
 * - In case of an exception, it logs the error and returns an object with `isError` set to true and includes the error details.
 * ------------------------------------------------------------------------------------
 */
async function sendLogger<E extends EventNames, A extends keyof EventActions[E]>(
	level: LogLevel,
	_title: string,
	_message: string,
	options: LoggerOptions<E, A>
) {
	try {
		// Determine which channel to post logs on
		if (!options?.sendToLogChannel) throw new Error('sendLogToChannel is undefind');

		// If Guild is null, the submission will be aborted
		if (!options.sendToLogChannel.guild) {
			print(level, 'Stop Submission', `"Guild" is null, so I stopped submitting`, {
				...options,
			});
			return;
		}

		const logChannel =
			options.sendToLogChannel.channel instanceof TextChannel
				? // If TextChannelClass is set, it is used as is
				  options.sendToLogChannel.channel
				: // Otherwise, use `Guild` to get the `Channel
				  getChannelsWithCache(options.sendToLogChannel.guild).textChannels?.find((channel) => {
						// If channel is set to a string (channelID), that value is used
						const channelId = (options.sendToLogChannel?.channel as string | undefined) || LOGCHANNEL_ID;
						return channel.id === channelId;
				  });
		if (!logChannel) throw new Error(`LogChannel(${LOGCHANNEL_ID} || ${options.sendToLogChannel?.channel}) is undefind`);

		// HelperFunctions
		const toInlineStr = (str: string | number) => `\`${str}\``;
		const buildOptionalDiscordString = (label: string, value?: string) => (value ? `${toInlineStr(label)}: <@${value}>` : '');
		const buildOptionalString = (label: string, value?: string | number) => (value ? `${toInlineStr(label)}: ${value}` : '');

		// Generate content
		const emoji = STATSU_EMOJI_MAP[level];
		const title = `${emoji}${_title || 'No Title'}`;
		const actionUser = buildOptionalDiscordString('ActionUser', options.userId || options.user?.id);
		const status = buildOptionalString('Status', level);
		const eventName = buildOptionalString('Event', options.event);
		const actionName = buildOptionalString('Action', options.action?.toString());
		const functionName = buildOptionalString('Function', options.func);
		const agent = buildOptionalString('Agent', options.agent);
		const message = buildOptionalString('Message', _message);
		const datetime = `${toInlineStr('Datetime')}: ${
			options?.datetime || getDatetime()?.datetime.format('yyyy-LL-dd-HH:mm:ss')
		}`;
		// Filter out empty strings
		const contentParts = [title, actionUser, status, eventName, actionName, functionName, agent, message, datetime].filter(
			(part) => part !== ''
		);

		// Post content to channels without waiting for asynchronous processing
		const msg = await logChannel.send({
			content: [line, ...contentParts].join('\n'),
			...options.sendToLogChannel.options,
		});
		return { isError: false, msg };
	} catch (e: unknown) {
		if (e instanceof Error) {
			print(level, 'Send Logger Error', e.message, {
				...options,
			});
			return {
				isError: true,
				...e,
			};
		}
	}
}
