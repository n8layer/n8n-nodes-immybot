import type { INodeProperties } from 'n8n-workflow';

export const providerLinkOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'providerLinks',
				],
			},
		},
		options: [
			{
				name: 'Get Many Provider Links',
				value: 'getManyProviderLinks',
				action: 'Get many provider links',
				description: 'Get all provider links with optional filters',
				routing: {
					request: {
						method: 'GET',
						url: '/provider-links',
						qs: {
							includeClients: '={{ $parameter.includeClients }}',
							includeUnlinkedClients: '={{ $parameter.includeUnlinkedClients }}',
							throwIfAgentInstallerVersionNotSet: '={{ $parameter.throwIfAgentInstallerVersionNotSet }}',
						},
					},
				},
			},
			{
				name: 'Get Provider Link',
				value: 'getProviderLink',
				action: 'Get a provider link',
				description: 'Get a specific provider link by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/provider-links/{{ $parameter.id }}',
						qs: {
							includeClients: true,
							includeUnlinkedClients: true,
							throwIfAgentInstallerVersionNotSet: true,
						},
					},
				},
			},
			{
				name: 'Get Provisioning Package',
				value: 'getProvisioningPackage',
				action: 'Get provisioning package',
				description: 'Get a provisioning package URI',
				routing: {
					request: {
						method: 'POST',
						url: '=/provider-links/{{ $parameter.id }}/agents/provisioning-package-uri-with-onboarding',
						returnFullResponse: true,
						body: {
							targetExternalClientId: '={{ $parameter.targetExternalClientId }}',
							ppkgOptions: {
								encryptPackage: '={{ $parameter.encryptPackage }}',
								packagePassword: '={{ $parameter.packagePassword }}',
								downloadISO: '={{ $parameter.downloadISO }}',
								wirelessOpen: '={{ $parameter.wirelessOpen }}',
								wirelessSSID: '={{ $parameter.wirelessSSID }}',
								wirelessKey: '={{ $parameter.wirelessKey }}',
								setupAdmin: '={{ $parameter.setupAdmin }}',
								localAdminUsername: '={{ $parameter.localAdminUsername }}',
								localAdminPassword: '={{ $parameter.localAdminPassword }}',
								hideAdminAccount: '={{ $parameter.hideAdminAccount }}',
								enableCleanPC: '={{ $parameter.enableCleanPC }}',
								disableHibernation: '={{ $parameter.disableHibernation }}',
								setupWireless: '={{ $parameter.setupWireless }}',
							},
							onboardingOptions: {
								automaticallyOnboard: '={{ $parameter.automaticallyOnboard }}',
								onboardingCorrelationId: '={{ $parameter.onboardingCorrelationId }}',
								onboardingSessionRebootPreference: '={{ $parameter.onboardingSessionRebootPreference }}',
								onboardingSessionPromptTimeoutAction: '={{ $parameter.onboardingSessionPromptTimeoutAction }}',
								onboardingSessionAutoConsentToReboots: '={{ $parameter.onboardingSessionAutoConsentToReboots }}',
								onboardingSessionPromptTimeoutMinutes: '={{ $parameter.onboardingSessionPromptTimeoutMinutes }}',
								onboardingSessionSendFollowUpEmail: '={{ $parameter.onboardingSessionSendFollowUpEmail }}',
								primaryPersonId: '={{ $parameter.primaryPersonId }}',
								additionalPersonIds: '={{ $parameter.additionalPersonIds }}',
								tags: '={{ $parameter.tags }}',
								isDevLab: '={{ $parameter.isDevLab }}',
							},
						},
					},
					output: {
						postReceive: [
							{
								type: 'set',
								properties: {
									value: '={{ { "ppkg_url": $response.body } }}',
								},
							},
						],
					},
				},
			},
		],
		default: 'getManyProviderLinks',
	},
];

export const providerLinkFields: INodeProperties[] = [
	{
		displayName: 'Include Clients',
		name: 'includeClients',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['providerLinks'],
				operation: ['getManyProviderLinks'],
			},
		},
		default: false,
		description: 'Whether to include clients in the response',
	},
	{
		displayName: 'Include Unlinked Clients',
		name: 'includeUnlinkedClients',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['providerLinks'],
				operation: ['getManyProviderLinks'],
			},
		},
		default: false,
		description: 'Whether to include unlinked clients in the response',
	},
	{
		displayName: 'Onboarding Options',
		name: 'onboardingOptions',
		type: 'collection',
		displayOptions: {
			show: {
				resource: ['providerLinks'],
				operation: ['getProvisioningPackage'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Automatically Onboard',
				name: 'automaticallyOnboard',
				type: 'boolean',
				default: false,
			},
			{
				displayName: 'Onboarding Correlation ID',
				name: 'onboardingCorrelationId',
				type: 'hidden',
				default: '',
			},
			{
				displayName: 'Reboot Preference',
				name: 'onboardingSessionRebootPreference',
				type: 'options',
				displayOptions: {
					show: {
						automaticallyOnboard: [true],
					},
				},
				options: [
					{
						name: 'If Necessary',
						value: 0,
					},
					{
						name: 'Force',
						value: -1,
					},
					{
						name: 'Suppress',
						value: 1,
					},
					{
						name: 'Prompt',
						value: 2,
					},
				],
				default: 0,
			},
			{
				displayName: 'Prompt Timeout Action',
				name: 'onboardingSessionPromptTimeoutAction',
				type: 'options',
				displayOptions: {
					show: {
						onboardingSessionRebootPreference: [2],
					},
				},
				options: [
					{
						name: 'Reboot',
						value: 0,
					},
					{
						name: 'Suppress',
						value: 1,
					},
					{
						name: 'Fail Session',
						value: 2,
					},
				],
				default: 0,
			},
			{
				displayName: 'Auto Consent to Reboots',
				name: 'onboardingSessionAutoConsentToReboots',
				type: 'boolean',
				displayOptions: {
					show: {
						onboardingSessionRebootPreference: [2],
					},
				},
				default: false,
			},
			{
				displayName: 'Prompt Timeout Minutes',
				name: 'onboardingSessionPromptTimeoutMinutes',
				type: 'number',
				displayOptions: {
					show: {
						onboardingSessionRebootPreference: [2],
					},
				},
				typeOptions: {
					minValue: 1,
					maxValue: 60,
				},
				default: 5,
			},
			{
				displayName: 'Send Follow-up Email',
				name: 'onboardingSessionSendFollowUpEmail',
				type: 'boolean',
				displayOptions: {
					show: {
						automaticallyOnboard: [true],
					},
				},
				default: false,
			},
			{
				displayName: 'Primary Person ID',
				name: 'primaryPersonId',
				type: 'number',
				default: undefined,
			},
			{
				displayName: 'Additional Person IDs',
				name: 'additionalPersonIds',
				type: 'string',
				default: '',
				description: 'Comma-separated list of person IDs',
			},
			{
				displayName: 'Tag IDs',
				name: 'tags',
				type: 'string',
				default: '',
				description: 'Comma-separated list of tag IDs',
			},
			{
				displayName: 'Is Dev Lab',
				name: 'isDevLab',
				type: 'boolean',
				default: false,
			},
		],
	},
	{
		displayName: 'Package Options',
		name: 'ppkgOptions',
		type: 'collection',
		displayOptions: {
			show: {
				resource: ['providerLinks'],
				operation: ['getProvisioningPackage'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Encrypt Package',
				name: 'encryptPackage',
				type: 'boolean',
				default: false,
			},
			{
				displayName: 'Package Password',
				name: 'packagePassword',
				type: 'string',
				typeOptions: {
					password: true,
				},
				displayOptions: {
					show: {
						encryptPackage: [true],
					},
				},
				default: '',
			},
			{
				displayName: 'Download ISO',
				name: 'downloadISO',
				type: 'boolean',
				default: false,
			},
			{
				displayName: 'Wireless Open',
				name: 'wirelessOpen',
				type: 'boolean',
				displayOptions: {
					show: {
						setupWireless: [true],
					},
				},
				default: false,
			},
			{
				displayName: 'Wireless SSID',
				name: 'wirelessSSID',
				type: 'string',
				displayOptions: {
					show: {
						setupWireless: [true],
					},
				},
				default: '',
			},
			{
				displayName: 'Wireless Key',
				name: 'wirelessKey',
				type: 'string',
				displayOptions: {
					show: {
						setupWireless: [true],
						wirelessOpen: [false],
					},
				},
				default: '',
			},
			{
				displayName: 'Setup Admin',
				name: 'setupAdmin',
				type: 'boolean',
				default: true,
			},
			{
				displayName: 'Local Admin Username',
				name: 'localAdminUsername',
				type: 'string',
				displayOptions: {
					show: {
						setupAdmin: [true],
					},
				},
				default: 'Administrator',
			},
			{
				displayName: 'Local Admin Password',
				name: 'localAdminPassword',
				type: 'string',
				typeOptions: {
					password: true,
				},
				displayOptions: {
					show: {
						setupAdmin: [true],
					},
				},
				default: 'AVeryGoodPassword',
			},
			{
				displayName: 'Hide Admin Account',
				name: 'hideAdminAccount',
				type: 'boolean',
				displayOptions: {
					show: {
						setupAdmin: [true],
					},
				},
				default: false,
			},
			{
				displayName: 'Enable Clean PC',
				name: 'enableCleanPC',
				type: 'boolean',
				default: false,
			},
			{
				displayName: 'Disable Hibernation',
				name: 'disableHibernation',
				type: 'boolean',
				default: true,
			},
			{
				displayName: 'Setup Wireless',
				name: 'setupWireless',
				type: 'boolean',
				default: true,
			},
		],
	},
	{
		displayName: 'Provider Link ID',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['providerLinks'],
				operation: ['getProvisioningPackage', 'getProviderLink'],
			},
		},
		default: '',
		description: 'The ID of the provider link',
	},
	{
		displayName: 'Target External Client ID',
		name: 'targetExternalClientId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['providerLinks'],
				operation: ['getProvisioningPackage'],
			},
		},
		default: '',
		description: 'The external client ID to target',
	},
	{
		displayName: 'Throw If Agent Installer Version Not Set',
		name: 'throwIfAgentInstallerVersionNotSet',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['providerLinks'],
				operation: ['getManyProviderLinks'],
			},
		},
		default: true,
		description: 'Whether to throw an error if agent installer version is not set',
	},
];
