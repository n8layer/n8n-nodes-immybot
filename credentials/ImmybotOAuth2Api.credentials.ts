import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class ImmybotOAuth2Api implements ICredentialType {
	name = 'immybotOAuth2Api';
	displayName = 'ImmyBot OAuth2 API';
	documentationUrl = 'https://docs.immy.bot';
	extends = ['oAuth2Api'];
	properties: INodeProperties[] = [
		{
			displayName: 'Grant Type',
			name: 'grantType',
			type: 'hidden',
			default: 'clientCredentials',
		},
		{
			displayName: 'Access Token URL',
			name: 'accessTokenUrl',
			type: 'string',
			default: '',
			required: true,
			description: 'URL to get access token from. Example: https://login.microsoftonline.com/{tenant-id}/oauth2/v2.0/token',
		},
		{
			displayName: 'Scope',
			name: 'scope',
			type: 'string',
			default: '',
			required: true,
			description: 'Scope to request. Example: https://{subdomain}.immy.bot/.default',
		},
		{
			displayName: 'Authentication',
			name: 'authentication',
			type: 'hidden',
			default: 'body',
		},
		{
			displayName: 'Client ID',
			name: 'clientId',
			type: 'string',
			default: '',
			required: true,
			description: 'Your Azure AD application client ID',
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
			description: 'Your Azure AD application client secret',
		},
	];
}
