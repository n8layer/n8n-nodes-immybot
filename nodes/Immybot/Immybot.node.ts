import type { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';

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
		inputs: ['main'] as NodeConnectionType[],
		outputs: ['main'] as NodeConnectionType[],
		credentials: [
			{
				name: 'immybotOAuth2Api',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{ "https://" + $credentials.scope.split("https://")[1].split(".")[0] + ".immy.bot/api/v1" }}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Computer',
						value: 'computers',
					},
					{
						name: 'Maintenance',
						value: 'maintenance',
					},
					{
						name: 'Person',
						value: 'persons',
					},
					{
						name: 'Provider Link',
						value: 'providerLinks',
					},
					{
						name: 'Tag',
						value: 'tags',
					},
					{
						name: 'Tenant',
						value: 'tenants',
					},
					{
						name: 'User',
						value: 'users',
					},
				],
				default: 'tags',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'tags',
						],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						action: 'Create a new tag',
						description: 'Create a new tag',
						routing: {
							request: {
								method: 'POST',
								url: '/tags',
								body: {
									name: '={{ $parameter.name }}',
									description: '={{ $parameter.description }}',
									color: '={{ $parameter.color }}',
								},
							},
						},
					},
					{
						name: 'Delete',
						value: 'delete',
						action: 'Delete a tag',
						description: 'Delete a tag by ID',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/tags/{{ $parameter.id }}',
							},
						},
					},
					{
						name: 'Get',
						value: 'get',
						action: 'Get all tags',
						description: 'Get all tags',
						routing: {
							request: {
								method: 'GET',
								url: '/tags',
							},
						},
					},
					{
						name: 'Get by ID',
						value: 'getById',
						action: 'Get a tag by ID',
						description: 'Get a specific tag by its ID',
						routing: {
							request: {
								method: 'GET',
								url: '=/tags/{{ $parameter.id }}',
							},
						},
					},
					{
						name: 'Update',
						value: 'update',
						action: 'Update a tag',
						description: 'Update an existing tag by ID',
						routing: {
							request: {
								method: 'POST',
								url: '=/tags/{{ $parameter.id }}',
								body: {
									name: '={{ $parameter.name }}',
									description: '={{ $parameter.description }}',
									color: '={{ $parameter.color }}',
								},
							},
						},
					},
				],
				default: 'get',
			},
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
						name: 'Get Provisioning Package',
						value: 'getProvisioningPackage',
						action: 'Get provisioning package with onboarding',
						description: 'Get a provisioning package URI with onboarding options',
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
						},
					},
				],
				default: 'getProvisioningPackage',
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['tags'],
						operation: ['getById', 'update', 'delete'],
					},
				},
				default: '',
				description: 'The ID of the tag',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['tags'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'The name of the tag',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['tags'],
						operation: ['update'],
					},
				},
				default: '',
				description: 'The name of the tag',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['tags'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'The description of the tag',
			},
			{
				displayName: 'Color',
				name: 'color',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['tags'],
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						name: 'Black',
						value: 'black',
					},
					{
						name: 'Blue',
						value: 'blue',
					},
					{
						name: 'Danger',
						value: 'danger',
					},
					{
						name: 'Orange',
						value: 'orange',
					},
					{
						name: 'Primary',
						value: 'primary',
					},
					{
						name: 'Purple',
						value: 'purple',
					},
					{
						name: 'Secondary',
						value: 'secondary',
					},
					{
						name: 'Success',
						value: 'success',
					},
					{
						name: 'Warning',
						value: 'warning',
					},
				],
				default: 'primary',
				description: 'The color of the tag',
			},
			{
				displayName: 'Provider Link ID',
				name: 'id',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['providerLinks'],
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
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'maintenance',
						],
					},
				},
				options: [
					{
						name: 'Run',
						value: 'run',
						action: 'Run maintenance or software installation',
						description: 'Run maintenance or software installation on specified computers',
						routing: {
							request: {
								method: 'POST',
								url: '/run-immy-service-new',
								body: {
									sessionGroupId: '={{ $parameter.sessionGroupId }}',
									maintenanceParams: {
										maintenanceIdentifier: '={{ $parameter.maintenanceIdentifier }}',
										maintenanceType: '={{ $parameter.maintenanceType }}',
										repair: '={{ $parameter.repair }}',
										desiredSoftwareState: '={{ $parameter.desiredSoftwareState }}',
										maintenanceTaskMode: '={{ $parameter.maintenanceTaskMode }}',
										taskParameterValues: '={{ $parameter.taskParameterValues }}',
									},
									skipBackgroundJob: '={{ $parameter.skipBackgroundJob }}',
									cacheOnly: '={{ $parameter.cacheOnly }}',
									rebootPreference: '={{ $parameter.rebootPreference }}',
									promptTimeoutAction: '={{ $parameter.promptTimeoutAction }}',
									autoConsentToReboots: '={{ $parameter.autoConsentToReboots }}',
									promptTimeoutMinutes: '={{ $parameter.promptTimeoutMinutes }}',
									propagateToChildTenants: '={{ $parameter.propagateToChildTenants }}',
									allowAccessToParentTenant: '={{ $parameter.allowAccessToParentTenant }}',
									scheduleExecutionAfterActiveHours: '={{ $parameter.scheduleExecutionAfterActiveHours }}',
									useComputersTimezoneForExecution: '={{ $parameter.useComputersTimezoneForExecution }}',
									fullMaintenance: '={{ $parameter.fullMaintenance }}',
									detectionOnly: '={{ $parameter.detectionOnly }}',
									resolutionOnly: '={{ $parameter.resolutionOnly }}',
									runInventoryInDetection: '={{ $parameter.runInventoryInDetection }}',
									deploymentId: '={{ $parameter.deploymentId }}',
									deploymentType: '={{ $parameter.deploymentType }}',
									offlineBehavior: '={{ $parameter.offlineBehavior }}',
									suppressRebootsDuringBusinessHours: '={{ $parameter.suppressRebootsDuringBusinessHours }}',
									sendDetectionEmail: '={{ $parameter.sendDetectionEmail }}',
									sendDetectionEmailWhenAllActionsAreCompliant: '={{ $parameter.sendDetectionEmailWhenAllActionsAreCompliant }}',
									sendFollowUpEmail: '={{ $parameter.sendFollowUpEmail }}',
									sendFollowUpOnlyIfActionNeeded: '={{ $parameter.sendFollowUpOnlyIfActionNeeded }}',
									showRunNowButton: '={{ $parameter.showRunNowButton }}',
									showPostponeButton: '={{ $parameter.showPostponeButton }}',
									showMaintenanceActions: '={{ $parameter.showMaintenanceActions }}',
									computers: '={{ $parameter.computers }}',
									tenants: '={{ $parameter.tenants }}',
									persons: '={{ $parameter.persons }}',
									useWinningDeployment: '={{ $parameter.useWinningDeployment }}',
									inventoryOnly: '={{ $parameter.inventoryOnly }}',
									licenseId: '={{ $parameter.licenseId }}',
								},
							},
						},
					},
				],
				default: 'run',
			},
			{
				displayName: 'Maintenance Parameters',
				name: 'maintenanceParams',
				type: 'collection',
				displayOptions: {
					show: {
						resource: ['maintenance'],
						operation: ['run'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Session Group ID',
						name: 'sessionGroupId',
						type: 'string',
						default: '',
						description: 'The session group ID for the maintenance task',
					},
					{
						displayName: 'Maintenance Identifier',
						name: 'maintenanceIdentifier',
						type: 'string',
						default: '',
						description: 'The identifier for the maintenance task',
					},
					{
						displayName: 'Task Mode',
						name: 'maintenanceTaskMode',
						type: 'options',
						options: [
							{
								name: 'Enforce',
								value: 0,
							},
							{
								name: 'Audit',
								value: 1,
							},
							{
								name: 'Monitor',
								value: 2,
							},
							{
								name: 'Ignore',
								value: 3,
							},
						],
						default: 0,
						description: 'The mode of the maintenance task',
					},
					{
						displayName: 'Maintenance Type',
						name: 'maintenanceType',
						type: 'number',
						default: 0,
						description: 'The type of maintenance to perform',
					},
					{
						displayName: 'Repair',
						name: 'repair',
						type: 'boolean',
						default: false,
						description: 'Whether to repair the software',
					},
					{
						displayName: 'Software Should Be',
						name: 'desiredSoftwareState',
						type: 'options',
						options: [
							{
								name: 'Installed - Latest Version',
								value: 5,
							},
							{
								name: 'Installed - Any Version',
								value: 2,
							},
							{
								name: 'Update if Found',
								value: 7,
							},
							{
								name: 'Uninstalled',
								value: 1,
							},
							{
								name: 'Ignored',
								value: 6,
							},
						],
						default: 5,
						description: 'The desired state of the software',
					},
					{
						displayName: 'Task Parameter Values',
						name: 'taskParameterValues',
						type: 'json',
						default: '{}',
						description: 'JSON object containing task parameter values',
					},
				],
			},
			{
				displayName: 'Execution Options',
				name: 'executionOptions',
				type: 'collection',
				displayOptions: {
					show: {
						resource: ['maintenance'],
						operation: ['run'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Skip Background Job',
						name: 'skipBackgroundJob',
						type: 'boolean',
						default: true,
					},
					{
						displayName: 'Cache Only',
						name: 'cacheOnly',
						type: 'boolean',
						default: false,
					},
					{
						displayName: 'Reboot Preference',
						name: 'rebootPreference',
						type: 'options',
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
						default: 1,
					},
					{
						displayName: 'Prompt Timeout Action',
						name: 'promptTimeoutAction',
						type: 'options',
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
						default: 1,
					},
					{
						displayName: 'Auto Consent to Reboots',
						name: 'autoConsentToReboots',
						type: 'boolean',
						default: false,
					},
					{
						displayName: 'Prompt Timeout Minutes',
						name: 'promptTimeoutMinutes',
						type: 'number',
						typeOptions: {
							minValue: 1,
							maxValue: 60,
						},
						default: 5,
					},
					{
						displayName: 'Update Time',
						name: 'updateTime',
						type: 'string',
						default: '',
						description: 'Time to schedule the execution (24-hour format, e.g. "02:00")',
					},
					{
						displayName: 'Time Zone',
						name: 'timeZoneInfoId',
						type: 'string',
						default: '',
						description: 'Time zone for the scheduled execution (e.g. "America/Detroit")',
					},
				],
			},
			{
				displayName: 'Deployment Options',
				name: 'deploymentOptions',
				type: 'collection',
				displayOptions: {
					show: {
						resource: ['maintenance'],
						operation: ['run'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Deployment ID',
						name: 'deploymentId',
						type: 'number',
						default: 0,
					},
					{
						displayName: 'Deployment Type',
						name: 'deploymentType',
						type: 'number',
						default: 1,
					},
					{
						displayName: 'Offline Behavior',
						name: 'offlineBehavior',
						type: 'options',
						options: [
							{
								name: 'Skip',
								value: 1,
							},
							{
								name: 'Apply on Connect',
								value: 2,
							},
						],
						default: 2,
						description: 'How to handle offline computers',
					},
					{
						displayName: 'Use Winning Deployment',
						name: 'useWinningDeployment',
						type: 'boolean',
						default: false,
					},
				],
			},
			{
				displayName: 'Email Options',
				name: 'emailOptions',
				type: 'collection',
				displayOptions: {
					show: {
						resource: ['maintenance'],
						operation: ['run'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Send Detection Email',
						name: 'sendDetectionEmail',
						type: 'boolean',
						default: false,
					},
					{
						displayName: 'Send Detection Email When All Actions Are Compliant',
						name: 'sendDetectionEmailWhenAllActionsAreCompliant',
						type: 'boolean',
						default: false,
					},
					{
						displayName: 'Send Follow-up Email',
						name: 'sendFollowUpEmail',
						type: 'boolean',
						default: false,
					},
					{
						displayName: 'Send Follow-up Only If Action Needed',
						name: 'sendFollowUpOnlyIfActionNeeded',
						type: 'boolean',
						default: false,
					},
				],
			},
			{
				displayName: 'UI Options',
				name: 'uiOptions',
				type: 'collection',
				displayOptions: {
					show: {
						resource: ['maintenance'],
						operation: ['run'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Show Run Now Button',
						name: 'showRunNowButton',
						type: 'boolean',
						default: false,
					},
					{
						displayName: 'Show Postpone Button',
						name: 'showPostponeButton',
						type: 'boolean',
						default: false,
					},
					{
						displayName: 'Show Maintenance Actions',
						name: 'showMaintenanceActions',
						type: 'boolean',
						default: false,
					},
				],
			},
			{
				displayName: 'Targets',
				name: 'targets',
				type: 'collection',
				displayOptions: {
					show: {
						resource: ['maintenance'],
						operation: ['run'],
					},
				},
				default: {},
				options: [
					{
						displayName: 'Computer IDs',
						name: 'computers',
						type: 'json',
						default: '[]',
						description: 'Array of computer objects with computerId property',
					},
					{
						displayName: 'Tenant IDs',
						name: 'tenants',
						type: 'json',
						default: '[]',
						description: 'Array of tenant IDs',
					},
					{
						displayName: 'Person IDs',
						name: 'persons',
						type: 'json',
						default: '[]',
						description: 'Array of person IDs',
					},
				],
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'tenants',
						],
					},
				},
				options: [
					{
						name: 'Bulk Delete',
						value: 'bulkDelete',
						action: 'Bulk delete tenants',
						description: 'Bulk delete tenants',
						routing: {
							request: {
								method: 'POST',
								url: '/tenants/bulk-delete',
								body: {
									ids: '={{ JSON.parse($parameter.ids) }}',
								},
							},
						},
					},
					{
						name: 'Create',
						value: 'create',
						action: 'Create a new tenant',
						description: 'Create a new tenant',
						routing: {
							request: {
								method: 'POST',
								url: '/tenants',
								body: {
									ownerTenantId: '={{ $parameter.ownerTenantId }}',
									name: '={{ $parameter.name }}',
									slug: '={{ $parameter.slug }}',
									parentTenantId: '={{ $parameter.parentTenantId }}',
									isMsp: '={{ $parameter.isMsp }}',
								},
							},
						},
					},
					{
						name: 'Get Many',
						value: 'getAll',
						action: 'Get many tenants',
						description: 'Get information about many tenants',
						routing: {
							request: {
								method: 'GET',
								url: '={{ $parameter.tenantId ? `/tenants/${$parameter.tenantId}` : "/tenants" }}',
							},
						},
					},
					{
						name: 'Update',
						value: 'update',
						action: 'Update a tenant',
						description: 'Update an existing tenant',
						routing: {
							request: {
								method: 'PUT',
								url: '=/tenants/{{ $parameter.id }}',
								body: {
									id: '={{ $parameter.id }}',
									name: '={{ $parameter.name }}',
									slug: '={{ $parameter.slug }}',
									parentTenantId: '={{ $parameter.parentTenantId }}',
									isMsp: '={{ $parameter.isMsp }}',
								},
							},
						},
					},
				],
				default: 'create',
			},
			{
				displayName: 'Tenant ID',
				name: 'tenantId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['tenants'],
						operation: ['getAll'],
					},
				},
				default: '',
				description: 'Optional: The ID of a specific tenant to retrieve',
			},
			{
				displayName: 'ID',
				name: 'id',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['tenants'],
						operation: ['update'],
					},
				},
				default: undefined,
				description: 'The ID of the tenant to edit',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['tenants'],
						operation: ['update'],
					},
				},
				default: '',
				description: 'The name of the tenant',
			},
			{
				displayName: 'Slug',
				name: 'slug',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['tenants'],
						operation: ['update'],
					},
				},
				default: '',
				description: 'The slug (URL-friendly identifier) for the tenant',
			},
			{
				displayName: 'Parent Tenant ID',
				name: 'parentTenantId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['tenants'],
						operation: ['update'],
					},
				},
				default: undefined,
				description: 'The ID of the parent tenant (optional)',
			},
			{
				displayName: 'Is MSP',
				name: 'isMsp',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['tenants'],
						operation: ['update'],
					},
				},
				default: false,
				description: 'Whether this tenant is a Managed Service Provider',
			},
			{
				displayName: 'Owner Tenant ID',
				name: 'ownerTenantId',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['tenants'],
						operation: ['create'],
					},
				},
				default: 1,
				description: 'The ID of the owner tenant',
			},
			{
				displayName: 'First Name',
				name: 'firstName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['tenants'],
						operation: ['createPerson'],
					},
				},
				default: '',
				description: 'The first name of the person',
			},
			{
				displayName: 'Last Name',
				name: 'lastName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['tenants'],
						operation: ['createPerson'],
					},
				},
				default: '',
				description: 'The last name of the person',
			},
			{
				displayName: 'Email Address',
				name: 'emailAddress',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['tenants'],
						operation: ['createPerson'],
					},
				},
				default: '',
				description: 'The email address of the person',
			},
			{
				displayName: 'Tenant ID',
				name: 'tenantId',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['tenants'],
						operation: ['createPerson'],
					},
				},
				default: 1,
				description: 'The ID of the tenant this person belongs to',
			},
			{
				displayName: 'Azure Principal ID',
				name: 'azurePrincipalId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['tenants'],
						operation: ['createPerson'],
					},
				},
				default: '',
				description: 'The Azure Principal ID for the person (optional)',
			},
			{
				displayName: 'Person ID',
				name: 'personId',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['tenants'],
						operation: ['convertToTechnician'],
					},
				},
				default: '',
				description: 'The ID of the person to convert to a technician',
			},
			{
				displayName: 'Has Management Access',
				name: 'hasManagementAccess',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['tenants'],
						operation: ['convertToTechnician'],
					},
				},
				default: true,
				description: 'Whether the technician has management access',
			},
			{
				displayName: 'IDs',
				name: 'ids',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['tenants'],
						operation: ['bulkDelete'],
					},
				},
				default: '[]',
				description: 'Enter a JSON array of tenant IDs to delete (e.g. ["297", "298"])',
			},
			{
				displayName: 'First Name',
				name: 'firstName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['tenants'],
						operation: ['createPerson'],
					},
				},
				default: '',
				description: 'The first name of the person',
			},
			{
				displayName: 'Last Name',
				name: 'lastName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['tenants'],
						operation: ['createPerson'],
					},
				},
				default: '',
				description: 'The last name of the person',
			},
			{
				displayName: 'Email Address',
				name: 'emailAddress',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['tenants'],
						operation: ['createPerson'],
					},
				},
				default: '',
				description: 'The email address of the person',
			},
			{
				displayName: 'Tenant ID',
				name: 'tenantId',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['tenants'],
						operation: ['createPerson'],
					},
				},
				default: 1,
				description: 'The ID of the tenant this person belongs to',
			},
			{
				displayName: 'Azure Principal ID',
				name: 'azurePrincipalId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['tenants'],
						operation: ['createPerson'],
					},
				},
				default: '',
				description: 'The Azure Principal ID for the person (optional)',
			},
			{
				displayName: 'Person ID',
				name: 'personId',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['tenants'],
						operation: ['deletePerson'],
					},
				},
				default: '',
				description: 'The ID of the person to delete',
			},
			{
				displayName: 'Tenant ID',
				name: 'tenantId',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['tenants'],
						operation: ['getById'],
					},
				},
				default: '',
				description: 'The ID of the tenant to retrieve',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'computers',
						],
					},
				},
				options: [
					{
						name: 'Get Inventory',
						value: 'getInventory',
						action: 'Get all inventory',
						description: 'Get all inventory',
						routing: {
							request: {
								method: 'GET',
								url: '/computers/inventory',
							},
						},
					},
					{
						name: 'Get Computers Paged',
						value: 'getComputersPaged',
						action: 'Get computers paged',
						description: 'Retrieve all computer details (paged)',
						routing: {
							request: {
								method: 'GET',
								url: '/computers/paged',
								qs: {
									filter: '={{ $parameter.enableFilter ? $parameter.filter : undefined }}',
								},
							},
						},
					},
					{
						name: 'Get Agent Status',
						value: 'getAgentStatus',
						action: 'Get agent status',
						description: 'Retrieve agent status for computers by user ID',
						routing: {
							request: {
								method: 'GET',
								url: '/computers/agent-status',
							},
						},
					},
				],
				default: 'getInventory',
			},
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['computers'],
						operation: ['getAgentStatus'],
					},
				},
				default: '',
				description: 'The user ID to filter computers by',
			},
			{
				displayName: 'Filter',
				name: 'filter',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['computers'],
						operation: ['getComputersPaged'],
					},
				},
				default: '',
				description: 'Filter computers by (e.g. testemail@test.com)',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'users',
						],
					},
				},
				options: [
					{
						name: 'Create User From Person',
						value: 'createFromPerson',
						action: 'Create a user from a person',
						description: 'Create a new user from an existing person',
						routing: {
							request: {
								method: 'POST',
								url: '/users/create-from-person',
								body: {
									personId: '={{ $parameter.personId }}',
									hasManagementAccess: '={{ $parameter.hasManagementAccess }}',
								},
							},
						},
					},
					{
						name: 'Update a User',
						value: 'update',
						action: 'Update a user',
						description: 'Update settings for an existing user',
						routing: {
							request: {
								method: 'POST',
								url: '=/users/{{ $parameter.userId }}',
								body: {
									id: '={{ $parameter.userId }}',
									isAdmin: '={{ $parameter.isAdmin }}',
									tenantId: '={{ $parameter.tenantId }}',
									canManageCrossTenantDeployments: '={{ $parameter.canManageCrossTenantDeployments }}',
									hasManagementAccess: '={{ $parameter.hasManagementAccess }}',
								},
							},
						},
					},
					{
						name: 'Delete a User',
						value: 'deleteTechnician',
						action: 'Delete a user',
						description: 'Delete a user by user ID',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/users/{{ $parameter.userId }}',
							},
						},
					},
					{
						name: 'Get Users',
						value: 'getUsersList',
						action: 'Get users',
						description: 'Retrieve a list of users',
						routing: {
							request: {
								method: 'GET',
								url: '/users',
							},
						},
					},
				],
				default: 'getUsersList',
			},
			{
				displayName: 'Person ID',
				name: 'userId',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['users'],
						operation: ['update'],
					},
				},
				default: '',
				description: 'The person ID to configure as a user',
			},
			{
				displayName: 'Is Admin',
				name: 'isAdmin',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['users'],
						operation: ['update'],
					},
				},
				default: false,
				description: 'Whether the user should have admin privileges',
			},
			{
				displayName: 'Tenant ID',
				name: 'tenantId',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['users'],
						operation: ['update'],
					},
				},
				default: 1,
				description: 'The ID of the tenant this user belongs to',
			},
			{
				displayName: 'Can Manage Cross-Tenant Deployments',
				name: 'canManageCrossTenantDeployments',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['users'],
						operation: ['update'],
						isAdmin: [false],
					},
				},
				default: false,
				description: 'Whether the user can manage deployments across tenants',
			},
			{
				displayName: 'Has Management Access',
				name: 'hasManagementAccess',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['users'],
						operation: ['update'],
					},
				},
				default: true,
				description: 'Whether the user has management access',
			},
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['users'],
						operation: ['deleteTechnician'],
					},
				},
				default: '',
				description: 'The ID of the technician to delete',
			},
			{
				displayName: 'Person ID',
				name: 'personId',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['users'],
						operation: ['deletePerson'],
					},
				},
				default: '',
				description: 'The ID of the person to delete',
			},
			{
				displayName: 'Person ID',
				name: 'personId',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['users'],
						operation: ['createFromPerson'],
					},
				},
				default: '',
				description: 'The ID of the person to create a user from',
			},
			{
				displayName: 'Has Management Access',
				name: 'hasManagementAccess',
				type: 'boolean',
				displayOptions: {
					show: {
						resource: ['users'],
						operation: ['createFromPerson'],
					},
				},
				default: true,
				description: 'Whether the user should have management access',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['persons'],
					},
				},
				options: [
					{
						name: 'Create Person',
						value: 'createPerson',
						action: 'Create a new person',
						description: 'Create a new person',
						routing: {
							request: {
								method: 'POST',
								url: '/persons',
								body: {
									id: 0,
									firstName: '={{ $parameter.firstName }}',
									lastName: '={{ $parameter.lastName }}',
									emailAddress: '={{ $parameter.emailAddress }}',
									tenantId: '={{ $parameter.tenantId }}',
									azurePrincipalId: '={{ $parameter.azurePrincipalId }}',
								},
							},
						},
					},
					{
						name: 'Delete Person',
						value: 'deletePerson',
						action: 'Delete a person',
						description: 'Delete a person by person ID',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/persons/{{ $parameter.personId }}',
							},
						},
					},
					{
						name: 'Get People',
						value: 'getPeople',
						action: 'Get people',
						description: 'Retrieve a list of people',
						routing: {
							request: {
								method: 'GET',
								url: '/persons',
							},
						},
					},
				],
				default: 'getPeople',
			},
			{
				displayName: 'First Name',
				name: 'firstName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['persons'],
						operation: ['createPerson'],
					},
				},
				default: '',
				description: 'The first name of the person',
			},
			{
				displayName: 'Last Name',
				name: 'lastName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['persons'],
						operation: ['createPerson'],
					},
				},
				default: '',
				description: 'The last name of the person',
			},
			{
				displayName: 'Email Address',
				name: 'emailAddress',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['persons'],
						operation: ['createPerson'],
					},
				},
				default: '',
				description: 'The email address of the person',
			},
			{
				displayName: 'Tenant ID',
				name: 'tenantId',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['persons'],
						operation: ['createPerson'],
					},
				},
				default: 1,
				description: 'The ID of the tenant this person belongs to',
			},
			{
				displayName: 'Azure Principal ID',
				name: 'azurePrincipalId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['persons'],
						operation: ['createPerson'],
					},
				},
				default: '',
				description: 'The Azure Principal ID for the person (optional)',
			},
			{
				displayName: 'Person ID',
				name: 'personId',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['persons'],
						operation: ['deletePerson'],
					},
				},
				default: '',
				description: 'The ID of the person to delete',
			},
		],
	};
}
