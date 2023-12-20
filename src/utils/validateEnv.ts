const validateEnv = () => {
	if (!process.env.BOT_TOKEN) {
		console.warn('[x] worker > DiscordBot failed to start. \n => `process.env.BOT_TOKEN` is not set.');
		return false;
	}
	if (!process.env.CLIENT_ID) {
		console.warn("[x] worker > Failed to identify DiscordBot's Client. \n => `process.env.CLIENT_ID` is not set.");
		return false;
	}
	if (!process.env.GUILD_ID) {
		console.warn(
			'[x] worker > Could not identify the Guild in which DiscordBot is participating. \n => `process.env.GUILD_ID` is not set.'
		);
		return false;
	}
	return true;
};

export default validateEnv;
