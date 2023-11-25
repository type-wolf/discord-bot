import {
	VoiceChannel,
	TextChannel,
	StageChannel,
	ThreadChannel,
	type GuildBasedChannel,
	type Collection,
	type Guild,
	type NonThreadGuildBasedChannel,
} from 'discord.js';

type ChannelType = TextChannel | VoiceChannel | ThreadChannel | StageChannel | undefined;

type ChannelsType = Collection<string, GuildBasedChannel>;

type ChannelsReturnType<T> = Collection<string, T>;

export type GetChannelsReturnType = {
	textChannels?: ChannelsReturnType<TextChannel>;
	voiceChannels?: ChannelsReturnType<VoiceChannel>;
	forumChannels?: ChannelsReturnType<ThreadChannel>;
	stageChannels?: ChannelsReturnType<StageChannel>;
};

const getChannelsWithCache = (guild: Guild): GetChannelsReturnType => {
	const channels = guild.channels.cache;
	return {
		textChannels: getTextChannels(channels),
		voiceChannels: getVoiceChannels(channels),
		forumChannels: getForumChannels(channels),
		stageChannels: getStageChannels(channels),
	};
};

export const getChannelsWithFetch = async (guild: Guild): Promise<GetChannelsReturnType> => {
	const channels = await guild.channels.fetch();
	const newChannels = channels.filter((channel) => channel !== null) as Collection<string, NonThreadGuildBasedChannel>;
	return {
		textChannels: getTextChannels(newChannels),
		voiceChannels: getVoiceChannels(newChannels),
		forumChannels: getForumChannels(newChannels),
		stageChannels: getStageChannels(newChannels),
	};
};

export const getTextChannels = (channels: ChannelsType): ChannelsReturnType<TextChannel> =>
	channels.filter((channel) => channel instanceof TextChannel) as ChannelsReturnType<TextChannel>;

export const getVoiceChannels = (channels: ChannelsType): ChannelsReturnType<VoiceChannel> =>
	channels.filter((channel) => channel instanceof VoiceChannel) as ChannelsReturnType<VoiceChannel>;

export const getForumChannels = (channels: ChannelsType): ChannelsReturnType<ThreadChannel> =>
	channels.filter((channel) => channel instanceof ThreadChannel) as ChannelsReturnType<ThreadChannel>;

export const getStageChannels = (channels: ChannelsType): ChannelsReturnType<StageChannel> =>
	channels.filter((channel) => channel instanceof StageChannel) as ChannelsReturnType<StageChannel>;

export const getChannelById = (channels: ChannelsType, channelId: string): ChannelType =>
	channels.find((channel) => channel.id === channelId) as ChannelType;

export const getChannelsByName = (channels: ChannelsType, channelName: string): ChannelType =>
	channels.find((channel) => channel.name === channelName) as ChannelType;

export default getChannelsWithCache;
