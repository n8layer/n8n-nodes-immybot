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
			type: 'hidden',
			default: '={{ "https://login.microsoftonline.com/" + $credentials.tenantId + "/oauth2/v2.0/token" }}',
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
			type: 'hidden',
			default: '={{ "https://" + $credentials.subdomain + ".immy.bot/.default" }}',
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
