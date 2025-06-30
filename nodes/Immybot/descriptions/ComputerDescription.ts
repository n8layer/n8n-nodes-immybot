import type { INodeProperties } from 'n8n-workflow';

export const computerOperations: INodeProperties[] = [
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
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'data',
								},
								enabled: '={{ $parameter.returnIndividualItems === true }}',
							},
						],
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
							filter: '={{ $parameter.filter }}',
							skip: '={{ $parameter.skip }}',
							sort: '={{ $parameter.sort }}',
							take: '={{ $parameter.take }}',
							sortDesc: '={{ $parameter.sortDesc }}',
							onboardingOnly: '={{ $parameter.onboardingOnly }}',
							staleOnly: '={{ $parameter.staleOnly }}',
							devLabOnly: '={{ $parameter.devLabOnly }}',
							includeOffline: '={{ $parameter.includeOffline }}',
							tenantId: '={{ $parameter.tenantId }}',
							licensedOnly: '={{ $parameter.licensedOnly }}',
							deletedOnly: '={{ $parameter.deletedOnly }}',
						},
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'results',
								},
								enabled: '={{ $parameter.returnIndividualItems === true }}',
							},
						],
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
			{
				name: 'Get User Affinities',
				value: 'getUserAffinities',
				action: 'Get user affinities',
				description: 'Retrieve user affinities for computers',
				routing: {
					request: {
						method: 'GET',
						url: '/computers/user-affinities',
						qs: {
							computerId: '={{ $parameter.computerId }}',
						},
					},
				},
			},
		],
		default: 'getInventory',
	},
];

export const computerFields: INodeProperties[] = [
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
		description: 'Filter computers by criteria',
	},
	{
		displayName: 'Skip',
		name: 'skip',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['computers'],
				operation: ['getComputersPaged'],
			},
		},
		default: 0,
		description: 'Number of records to skip for pagination',
	},
	{
		displayName: 'Sort',
		name: 'sort',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['computers'],
				operation: ['getComputersPaged'],
			},
		},
		default: '',
		description: 'Field to sort by',
	},
	{
		displayName: 'Take',
		name: 'take',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['computers'],
				operation: ['getComputersPaged'],
			},
		},
		default: 50,
		description: 'Number of records to take (page size)',
	},
	{
		displayName: 'Sort Descending',
		name: 'sortDesc',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['computers'],
				operation: ['getComputersPaged'],
			},
		},
		default: true,
		description: 'Whether to sort in descending order',
	},
	{
		displayName: 'Onboarding Only',
		name: 'onboardingOnly',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['computers'],
				operation: ['getComputersPaged'],
			},
		},
		default: false,
		description: 'Whether to show only computers that are onboarding',
	},
	{
		displayName: 'Stale Only',
		name: 'staleOnly',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['computers'],
				operation: ['getComputersPaged'],
			},
		},
		default: false,
		description: 'Whether to show only stale computers',
	},
	{
		displayName: 'Dev Lab Only',
		name: 'devLabOnly',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['computers'],
				operation: ['getComputersPaged'],
			},
		},
		default: false,
		description: 'Whether to show only development lab computers',
	},
	{
		displayName: 'Include Offline',
		name: 'includeOffline',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['computers'],
				operation: ['getComputersPaged'],
			},
		},
		default: true,
		description: 'Whether to include offline computers in results',
	},
	{
		displayName: 'Tenant ID',
		name: 'tenantId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['computers'],
				operation: ['getComputersPaged'],
			},
		},
		default: '',
		description: 'Filter by specific tenant ID',
	},
	{
		displayName: 'Licensed Only',
		name: 'licensedOnly',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['computers'],
				operation: ['getComputersPaged'],
			},
		},
		default: false,
		description: 'Whether to show only licensed computers',
	},
	{
		displayName: 'Deleted Only',
		name: 'deletedOnly',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['computers'],
				operation: ['getComputersPaged'],
			},
		},
		default: false,
		description: 'Whether to show only deleted computers',
	},
	{
		displayName: 'Return Individual Items',
		name: 'returnIndividualItems',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['computers'],
				operation: ['getInventory', 'getComputersPaged'],
			},
		},
		default: true,
		description: 'Whether to return each item individually instead of grouped in an array. When enabled, each computer/inventory item becomes a separate output item.',
	},
	{
		displayName: 'Computer ID',
		name: 'computerId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['computers'],
				operation: ['getUserAffinities'],
			},
		},
		default: '',
		description: 'The ID of the computer to get user affinities for',
	},
];
