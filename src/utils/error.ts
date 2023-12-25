import getDatetime from './getDatetime';
import type { LoggerOptions } from './logger';
import type { EventNames } from '../constants/eventName';
import type { EventActions } from './maintenanceManager';
import { ERRORS, type ErrorCode } from '../constants/messages';

export type BotErrorOptions<E extends EventNames, A extends keyof EventActions[E]> = LoggerOptions<E, A> & {
	/**
	 * @description Custom message (if not set, the message in the default code will be used)
	 **/
	message?: string;
	language?: 'en' | 'ja';
};

/**
 * ------------------------------------------
 * @name - BotError
 * ------------------------------------------
 * @description -
 * ------------------------------------------
 * @param - code:
 * ------------------------------------------
 * @param - options?: Arbitrary arguments that this event receives
 * ------------------------------------------
 * @example
 * ```typescript
 *  try {
 *      throw new BotError('UNKNOWN_ERROR', {
 *          // Options
 *          message: '... custom message'
 *      })
 *  } catch (e: unknown) {
 *      if(e instanceof BotError) {
 *         const error = e
 *         // ... Error Handler
 *      }
 *  }
 *
 * ```
 * ------------------------------------------
 **/
export default class BotError<E extends EventNames, A extends keyof EventActions[E]> extends Error {
	public readonly code: ErrorCode;
	public readonly options?: BotErrorOptions<E, A>;
	constructor(code: ErrorCode = 'UNKNOWN', options?: BotErrorOptions<E, A>) {
		const message = options?.message || ERRORS[code].message[options?.language || 'en'];
		super(message);
		this.name = this.constructor.name;
		this.code = code;
		this.options = {
			...options,
			datetime: getDatetime()?.datetime.format('yyyy/LL/dd/HH:mm:ss'),
		};

		// Maintain stack trace in V8 engine (Node.js)
		if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor);
	}
}
