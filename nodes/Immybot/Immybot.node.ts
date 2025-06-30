import type {
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
} from 'n8n-workflow';

import { resourceOptions, operations, fields } from './descriptions';

export class Immybot implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'ImmyBot',
		name: 'immybot',
		icon: 'file:Immybot.svg',
		group: [],
		version: 1,
		subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
		description: 'ImmyBot Node',
		defaults: {
			name: 'ImmyBot',
		},
		usableAsTool: true,
		inputs: ['main'] as NodeConnectionType[],
		outputs: ['main'] as NodeConnectionType[],
		credentials: [
			{
				name: 'immybotOAuth2Api',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{ "https://" + $credentials.subdomain + ".immy.bot/api/v1" }}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			resourceOptions,
			...operations,
			...fields,
		],
	};
}
