import { type Guild, TextChannel, type User, type MessageOptions } from 'discord.js';
import getDatetime from './getDatetime';
import getChannelsWithCache from './getChannels';
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

export type LoggerOptions = {
	/**
	 * @description Title of this log
	 **/
	title?: string;

	/**
	 * @description Status indicated by this log
	 **/
	status?: Status;

	/**
	 * @description The action that triggered this log to be performed
	 **/
	actionName?: string;

	/**
	 * @description Message to be displayed in the log
	 **/
	message?: string;

	/**
	 * @description Agents that have performed actions (mobile, PC, app, browser, etc.)
	 **/
	agent?: string;

	/**
	 * @description Date to be set in the log (if from, this Class will get it)
	 **/
	datetime?: string;

	/**
	 * @description Set if you want to post this record to Discord's LogChannel
	 **/
	sendToLogChannel?: {
		guild: Guild;
		channel?: TextChannel | string;
		options?: {
			embed?: MessageOptions['embeds'];
			components?: MessageOptions['components'];
			files?: MessageOptions['files'];
			attachments?: MessageOptions['attachments'];
		};
	};
};

/**
 * ------------------------------------------
 * @name - Logger
 * ------------------------------------------
 * @description - Simply output data and status to the console
 * ------------------------------------------
 * @param - level: Receive log level (importance)
 * ------------------------------------------
 * @param - user: Receive complete user object
 * ------------------------------------------
 * @param - options?: Arbitrary arguments that this event receives
 * ------------------------------------------
 **/
export default class Logger {
	static log(level: LogLevel, user: User, options?: LoggerOptions) {
		print(level, user, options);
		if (options?.sendToLogChannel) {
			const res = sendLogger(level, user, options);
			return res;
		}
		return;
	}

	static info(user: User, options?: LoggerOptions) {
		Logger.log(LogLevel.INFO, user, options);
	}

	static success(user: User, options?: LoggerOptions) {
		Logger.log(LogLevel.SUCCESS, user, options);
	}

	static debug(user: User, options?: LoggerOptions) {
		Logger.log(LogLevel.DEBUG, user, options);
	}

	static warning(user: User, options?: LoggerOptions) {
		Logger.log(LogLevel.WARNING, user, options);
	}

	static error(user: User, options?: LoggerOptions) {
		Logger.log(LogLevel.ERROR, user, options);
	}
}

/**
 * @description Visually pleasing exterior lines on PC and mobile
 **/
const line = `----------------------------------`;

/**
 * ------------------------------------------
 * @name - print
 * ------------------------------------------
 * @description - Simply output data and status to the console
 * ------------------------------------------
 * @param - level: Receive log level (importance)
 * ------------------------------------------
 * @param - user: Receive complete user object
 * ------------------------------------------
 * @param - options?: Arbitrary arguments that this event receives
 * ------------------------------------------
 **/
function print(level: LogLevel, user: User, options?: LoggerOptions) {
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
	const actionName = `ActionName: ${options?.actionName || '-'}`;
	const agent = `Agent: ${options?.agent || '-'}`;
	const message = `Message: ${options?.message || '-'}`;
	const datetime = `Datetime: ${options?.datetime || getDatetime()?.datetime.format('yyyy/LL/dd/HH:mm:ss')}`;
	const content = `${line}\n${title}\n${actionUser}\n${actionUserTag}\n${status}\n${actionName}\n${agent}\n${message}\n${datetime}`;

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
 * ------------------------------------------
 * @name - sendLogger
 * ------------------------------------------
 * @description - Flexibly post log details to Discord's Channel
 * ------------------------------------------
 * @param - level: Receive log level (importance)
 * ------------------------------------------
 * @param - user: Receive complete user object
 * ------------------------------------------
 * @param - options?: Arbitrary arguments that this event receives
 * ------------------------------------------
 **/
async function sendLogger(level: LogLevel, user: User, options: LoggerOptions) {
	const toInlineStr = (str: string | number) => `\`${str}\``;

	try {
		// Determine which channel to post logs on
		if (!options?.sendToLogChannel) throw new Error('sendLogToChannel is undefind');

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
		const actionName = `${toInlineStr('ActionName')}: ${options.actionName || '-'}`;
		const agent = `${toInlineStr('Agent')}: ${options.agent || '-'}`;
		const message = `${toInlineStr('Message')}: ${options.message || '-'}`;
		const datetime = `${toInlineStr('Datetime')}: ${
			options?.datetime || getDatetime()?.datetime.format('yyyy/LL/dd/HH:mm:ss')
		}`;

		// Post content to channels without waiting for asynchronous processing
		logChannel.send({
			content: `${line}\n${title}\n${actionUser}\n${status}\n${actionName}\n${agent}\n${message}\n${datetime}`,
			...options.sendToLogChannel.options,
		});
		return {
			isError: false,
		};
	} catch (e: unknown) {
		if (e instanceof Error) {
			print(level, user, {
				...options,
				title: 'Log Error',
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
