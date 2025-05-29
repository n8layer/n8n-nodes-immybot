import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class ImmybotOAuth2Api implements ICredentialType {
	name = 'immybotOAuth2Api';
	displayName = 'ImmyBot OAuth2 API';
	documentationUrl = 'https://docs.immy.bot';
	properties: INodeProperties[] = [
		{
			displayName: 'ImmyBot Subdomain',
			name: 'subdomain',
			type: 'string',
			default: '',
			required: true,
			description: 'Your ImmyBot subdomain. For example, if your ImmyBot URL is https://my.immy.bot, your subdomain is my.',
		},
		{
			displayName: 'Tenant ID',
			name: 'tenantId',
			type: 'string',
			default: '',
			required: true,
			description: 'Your EntraID tenant ID',
		},
		{
			displayName: 'Client ID',
			name: 'clientId',
			type: 'string',
			default: '',
			required: true,
			description: 'Your EntraID application client ID',
		},
		{
			displayName: 'Client Secret',
			name: 'clientSecret',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Your EntraID application client secret',
		},
	];
}
