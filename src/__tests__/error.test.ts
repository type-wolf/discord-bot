import BotError from '../utils/error';
import { ERRORS } from '../constants/messages';
import getDatetime from '../utils/getDatetime';

describe('BotError', () => {
	it('should create an instance of BotError with default properties', () => {
		const error = new BotError();
		expect(error).toBeInstanceOf(BotError);
		expect(error.code).toBe('UNKNOWN');
		expect(error.message).toBe(ERRORS['UNKNOWN'].message.en);
	});

	it('should create an instance of BotError with a custom error code and default message', () => {
		const error = new BotError('UNKNOWN', {
			message: 'custom error message',
		});
		expect(error.message).toBe('custom error message');
	});

	it('should create an instance of BotError with a custom message', () => {
		const customMessage = 'This is a custom error message';
		const error = new BotError('UNKNOWN', { message: customMessage });
		expect(error.message).toBe(customMessage);
	});

	it('should include additional options in the BotError instance', () => {
		const datetime = getDatetime()?.datetime.format('yyyy/LL/dd/HH:mm:ss');
		const error = new BotError('UNKNOWN', { datetime });
		expect(error.options).toBeDefined();
		expect(error.options?.datetime).toBe(datetime);
	});
});
