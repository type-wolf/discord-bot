export const line = `----------------------------------`;
export const MESSAGE_LIMIT = 2000;

const processingMessage = (message: string) => {
	const messages: string[] = [];
	let remainingMessage = message;
	while (remainingMessage.length > 0) {
		let chunk = remainingMessage.slice(0, MESSAGE_LIMIT);
		const lastIndex = chunk.lastIndexOf(line);
		if (lastIndex !== -1 && remainingMessage.length > MESSAGE_LIMIT) {
			// Find the last line and separate chunks there
			chunk = chunk.slice(0, lastIndex + line.length);
		}
		messages.push(chunk);
		remainingMessage = remainingMessage.slice(chunk.length);
	}
	return messages;
};

export const conversionInlineMsg = (str: string) => `\`${str}\``;

export default processingMessage;
