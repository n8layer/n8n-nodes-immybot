import type { INodeProperties } from 'n8n-workflow';

export const maintenanceOperations: INodeProperties[] = [
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
];

export const maintenanceFields: INodeProperties[] = [
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
				displayName: 'Auto Consent to Reboots',
				name: 'autoConsentToReboots',
				type: 'boolean',
				default: false,
			},
			{
				displayName: 'Cache Only',
				name: 'cacheOnly',
				type: 'boolean',
				default: false,
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
				displayName: 'Skip Background Job',
				name: 'skipBackgroundJob',
				type: 'boolean',
				default: true,
			},
			{
				displayName: 'Time Zone',
				name: 'timeZoneInfoId',
				type: 'string',
				default: '',
				description: 'Time zone for the scheduled execution (e.g. "America/Detroit")',
			},
			{
				displayName: 'Update Time',
				name: 'updateTime',
				type: 'string',
				default: '',
				description: 'Time to schedule the execution (24-hour format, e.g. "02:00")',
			},
		],
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
				displayName: 'Maintenance Identifier',
				name: 'maintenanceIdentifier',
				type: 'string',
				default: '',
				description: 'The identifier for the maintenance task',
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
				displayName: 'Session Group ID',
				name: 'sessionGroupId',
				type: 'string',
				default: '',
				description: 'The session group ID for the maintenance task',
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
				displayName: 'Task Parameter Values',
				name: 'taskParameterValues',
				type: 'json',
				default: '{}',
				description: 'JSON object containing task parameter values',
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
];
