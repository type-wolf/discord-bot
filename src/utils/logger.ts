import { type Guild, TextChannel, type User, type ClientUser, type PartialUser, type MessageOptions } from 'discord.js';
import getDatetime from './getDatetime';
import getChannelsWithCache from './getChannels';
import type { EventNames } from '..';
import type { ActionNames } from './maintenanceManager';
import { LOGCHANNEL_ID } from '../constants/id';
import { WHITE_CHECK_MARK, WARNING, ROTATING_LIGHT } from '../constants/emoji';

enum LogLevel {
	INFO = 'INFO',
	SUCCESS = 'SUCCESS',
	WARNING = 'WARNING',
	ERROR = 'ERROR',
	DEBUG = 'DEBUG',
}

export type Status = 'Info' | 'Success' | 'Warning' | 'Error' | 'Debug';

/**
 * Defines the options for customizing log messages in the Logger class.
 */
export type LoggerOptions = {
	/**
	 * The title of the log message.
	 */
	title?: string;

	/**
	 * The status level of the log, which can be 'Info', 'Success', 'Warning', 'Error', or 'Debug'.
	 */
	status?: Status;

	/**
	 * The name of the event associated with the log.
	 */
	eventName?: EventNames;

	/**
	 * The name of the action that triggered the log.
	 */
	actionName?: ActionNames;

	/**
	 * The main message content of the log.
	 */
	message?: string;

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
	 * Logs a message with a specified log level, user, and optional additional options.
	 * @param {LogLevel} level - The log level (e.g., INFO, SUCCESS, WARNING, ERROR, DEBUG).
	 * @param {User | ClientUser | PartialUser} user - The user associated with the log.
	 * @param {LoggerOptions} [options] - Optional parameters for additional log details.
	 */
	static log(level: LogLevel, user: User | ClientUser | PartialUser, options?: LoggerOptions) {
		print(level, user, options);
		if (options?.sendToLogChannel) {
			const res = sendLogger(level, user, options);
			return res;
		}
		return;
	}

	/**
	 * Logs an informational message.
	 * @param {User | ClientUser | PartialUser} user - The user associated with the log.
	 * @param {LoggerOptions} [options] - Optional parameters for additional log details.
	 */
	static info(user: User | ClientUser | PartialUser, options?: LoggerOptions) {
		Logger.log(LogLevel.INFO, user, options);
	}

	/**
	 * Logs a success message.
	 * @param {User | ClientUser | PartialUser} user - The user associated with the log.
	 * @param {LoggerOptions} [options] - Optional parameters for additional log details.
	 */
	static success(user: User | ClientUser | PartialUser, options?: LoggerOptions) {
		Logger.log(LogLevel.SUCCESS, user, options);
	}

	/**
	 * Logs a debug message.
	 * @param {User | ClientUser | PartialUser} user - The user associated with the log.
	 * @param {LoggerOptions} [options] - Optional parameters for additional log details.
	 */
	static debug(user: User | ClientUser | PartialUser, options?: LoggerOptions) {
		Logger.log(LogLevel.DEBUG, user, options);
	}

	/**
	 * Logs a warning message.
	 * @param {User | ClientUser | PartialUser} user - The user associated with the log.
	 * @param {LoggerOptions} [options] - Optional parameters for additional log details.
	 */
	static warning(user: User | ClientUser | PartialUser, options?: LoggerOptions) {
		Logger.log(LogLevel.WARNING, user, options);
	}

	/**
	 * Logs an error message.
	 * @param {User | ClientUser | PartialUser} user - The user associated with the log.
	 * @param {LoggerOptions} [options] - Optional parameters for additional log details.
	 */
	static error(user: User | ClientUser | PartialUser, options?: LoggerOptions) {
		Logger.log(LogLevel.ERROR, user, options);
	}
}

const line = `----------------------------------`;

/**
 * Outputs a formatted log message to the console based on the provided log level, user, and optional logger options.
 *
 * @param {LogLevel} level - The log level for the message.
 * @param {User | ClientUser | PartialUser} user - The user associated with the log message.
 * @param {LoggerOptions} [options] - Optional parameters to customize the log message.
 *
 * This function formats a log message including details like the user's ID, username, the specified status, event name, action name, agent, message, and datetime. It then outputs the message to the console using an appropriate console method based on the specified status in options (if any). The status can be 'Info', 'Success', 'Warning', 'Error', or 'Debug', and if no status is specified, the default `console.log` is used.
 *
 * - If `options.status` is 'Info', `console.info` is used.
 * - If `options.status` is 'Success', `console.log` is used.
 * - If `options.status` is 'Warning', `console.warn` is used.
 * - If `options.status` is 'Error', `console.error` is used.
 * - If `options.status` is 'Debug', `console.debug` is used.
 */
function print(level: LogLevel, user: User | ClientUser | PartialUser, options?: LoggerOptions) {
	// Generate content
	const emoji =
		options?.status === 'Info'
			? ''
			: options?.status === 'Success'
			? WHITE_CHECK_MARK
			: options?.status === 'Warning'
			? WARNING
			: options?.status === 'Error'
			? ROTATING_LIGHT
			: options?.status === 'Debug'
			? ''
			: ''; // status is undefined;
	const title = `${emoji}${options?.title || 'No Title'}`;
	const actionUser = `ActionUser: ${user.id}`;
	const actionUserTag = `ActionUserTag: ${user.tag || user.username}`;
	const status = `Status: ${options?.status || level}`;
	const eventName = `EventName: ${options?.eventName || '-'}`;
	const actionName = `ActionName: ${options?.actionName || '-'}`;
	const agent = `Agent: ${options?.agent || '-'}`;
	const message = `Message: ${options?.message || '-'}`;
	const datetime = `Datetime: ${options?.datetime || getDatetime()?.datetime.format('yyyy/LL/dd/HH:mm:ss')}`;
	const content = `${line}\n${title}\n${actionUser}\n${actionUserTag}\n${status}\n${eventName}\n${actionName}\n${agent}\n${message}\n${datetime}`;

	// Output switched by status
	if (!options?.status) {
		console.log(content);
		return;
	}
	if (options.status === 'Info') {
		console.info(content);
		return;
	}
	if (options.status === 'Success') {
		console.log(content);
		return;
	}
	if (options.status === 'Warning') {
		console.warn(content);
		return;
	}
	if (options.status === 'Error') {
		console.error(content);
		return;
	}
	if (options.status === 'Debug') {
		console.debug(content);
		return;
	}
}

/**
 * Asynchronously posts log details to a specified Discord channel.
 *
 * @param {LogLevel} level - The log level for the message.
 * @param {User | ClientUser | PartialUser} user - The user associated with the log message.
 * @param {LoggerOptions} options - Parameters to customize the log message, including Discord channel details.
 *
 * This function posts a formatted log message to a Discord channel specified in the `options.sendToLogChannel`. It constructs a message including user, status, event name, action name, agent, message, and datetime details. If the guild or channel is not correctly specified in the options, it logs a warning or error message using the `print` function.
 *
 * The function handles the following scenarios:
 * - If `options.sendToLogChannel` is not defined or `options.sendToLogChannel.guild` is null, it logs a warning and aborts the submission.
 * - If the specified Discord channel is not found or undefined, it throws an error.
 * - On successful execution, it returns an object with `isError` set to false.
 * - In case of an exception, it logs the error and returns an object with `isError` set to true and includes the error details.
 *
 * @returns An object indicating whether an error occurred during the log submission.
 */
async function sendLogger(level: LogLevel, user: User | ClientUser | PartialUser, options: LoggerOptions) {
	const toInlineStr = (str: string | number) => `\`${str}\``;

	try {
		// Determine which channel to post logs on
		if (!options?.sendToLogChannel) throw new Error('sendLogToChannel is undefind');

		// If Guild is null, the submission will be aborted
		if (!options.sendToLogChannel.guild) {
			print(level, user, {
				...options,
				title: 'Stop Submission',
				status: 'Warning',
				message: `"Guild" is null, so I stopped submitting`,
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

		// Generate content
		const emoji =
			options.status === 'Info'
				? ''
				: options.status === 'Success'
				? WHITE_CHECK_MARK
				: options.status === 'Warning'
				? WARNING
				: options.status === 'Error'
				? ROTATING_LIGHT
				: options.status === 'Debug'
				? ''
				: ''; // status is undefined;
		const title = `${emoji}${options.title || 'No Title'}`;
		const actionUser = `${toInlineStr('ActionUser')}: <@${user.id}>`;
		const status = `${toInlineStr('Status')}: ${options.status || level}`;
		const eventName = `${toInlineStr('EventName')}: ${options.eventName || '-'}`;
		const actionName = `${toInlineStr('ActionName')}: ${options.actionName || '-'}`;
		const agent = `${toInlineStr('Agent')}: ${options.agent || '-'}`;
		const message = `${toInlineStr('Message')}: ${options.message || '-'}`;
		const datetime = `${toInlineStr('Datetime')}: ${
			options?.datetime || getDatetime()?.datetime.format('yyyy/LL/dd/HH:mm:ss')
		}`;

		// Post content to channels without waiting for asynchronous processing
		logChannel.send({
			content: `${line}\n${title}\n${actionUser}\n${status}\n${eventName}\n${actionName}\n${agent}\n${message}\n${datetime}`,
			...options.sendToLogChannel.options,
		});
		return {
			isError: false,
		};
	} catch (e: unknown) {
		if (e instanceof Error) {
			print(level, user, {
				...options,
				title: 'Send Logger Error',
				status: 'Error',
				message: e.message,
			});
			return {
				isError: true,
				...e,
			};
		}
	}
}
