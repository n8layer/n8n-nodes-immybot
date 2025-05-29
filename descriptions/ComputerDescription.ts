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
	}
]