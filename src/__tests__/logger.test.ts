import Logger from '../utils/logger';

describe('Logger', () => {
	it('should log an info message to the console', () => {
		const consoleSpy = jest.spyOn(console, 'info').mockImplementation();
		Logger.info('Info Log', 'this is a test info log', {
			event: 'onReady',
			action: 'addSlashCommand',
			func: 'setupInteraction',
			agent: 'ios',
		});

		expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Info Log'));
		expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('this is a test info log'));
		consoleSpy.mockRestore();
	});

	it('should log an error message to the console', () => {
		const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
		Logger.error('Error Title', 'Error message');

		expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error Title'));
		expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error message'));
		consoleSpy.mockRestore();
	});
});
