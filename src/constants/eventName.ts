/**
 * @description Event handlers registered for this bot
 **/
export type EventNames =
	| 'onReady'
	| 'onInteractionCreate'
	| 'onInteractions'
	| 'onButtons'
	| 'onSelectMenus'
	| 'onModalSubmits'
	| 'onGuildMemberAdd'
	| 'onMessageCreate'
	| 'onMessageDelete'
	| 'onMessageReactionAdd'
	| 'onMessageReactionRemove'
	| 'onGuildMemberUpdate'
	| 'onGuildScheduledEventCreate'
	| 'onGuildScheduledEventUpdate'
	| 'onGuildScheduledEventDelete';

const eventNames: EventNames[] = [
	'onReady',
	'onInteractionCreate',
	'onInteractions',
	'onButtons',
	'onSelectMenus',
	'onModalSubmits',
	'onMessageCreate',
	'onMessageDelete',
	'onMessageReactionAdd',
	'onMessageReactionRemove',
	'onGuildMemberAdd',
	'onGuildMemberUpdate',
	'onGuildScheduledEventCreate',
	'onGuildScheduledEventUpdate',
	'onGuildScheduledEventDelete',
];

export default eventNames;
