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
			displayName: 'Azure AD Tenant ID',
			name: 'tenantId',
			type: 'string',
			default: '',
			required: true,
			placeholder: '12345678-1234-1234-1234-123456789abc',
			description: 'Your Azure AD tenant ID (GUID format). You can find this in Azure Portal > Azure Active Directory > Overview > Tenant ID',
		},
		{
			displayName: 'Access Token URL',
			name: 'accessTokenUrl',
			type: 'string',
			default: '',
			required: true,
			placeholder: 'https://login.microsoftonline.com/YOUR_TENANT_ID/oauth2/v2.0/token',
			description: 'Enter the full Azure AD OAuth2 token endpoint URL. Replace YOUR_TENANT_ID with your actual tenant ID from above.',
		},
		{
			displayName: 'ImmyBot Subdomain',
			name: 'subdomain',
			type: 'string',
			default: '',
			required: true,
			placeholder: 'yourcompany',
			description: 'Your ImmyBot subdomain (the part before .immy.bot in your ImmyBot URL)',
		},
		{
			displayName: 'Scope',
			name: 'scope',
			type: 'string',
			default: '',
			required: true,
			placeholder: 'https://yourcompany.immy.bot/.default',
			description: 'Enter the OAuth2 scope URL. Replace "yourcompany" with your ImmyBot subdomain from above.',
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
