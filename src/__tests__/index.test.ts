import { Client } from 'discord.js';
import IntentOptions from '../config/IntentOptions';
import onReady from '../events/onReady';

describe('Discord Bot', () => {
	let bot: Client;

	beforeEach(() => {
		bot = new Client({ intents: IntentOptions });
	});

	it('onReady should be called when DiscordBot is started', async () => {
		const mockOnReady = jest.fn(onReady);
		await mockOnReady(bot, { BOT: bot });
		expect(mockOnReady).toHaveBeenCalled();
	});

	afterEach(() => {
		bot.destroy();
	});
});
