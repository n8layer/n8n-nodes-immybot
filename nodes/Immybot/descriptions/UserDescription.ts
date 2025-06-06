import type { INodeProperties } from 'n8n-workflow';

export const userOperations: INodeProperties[] = [
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
				name: 'Create User',
				value: 'createFromPerson',
				action: 'Create a new user',
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
				name: 'Get Many Users',
				value: 'getManyUsers',
				action: 'Get many users',
				description: 'Retrieve a list of all users',
				routing: {
					request: {
						method: 'GET',
						url: '/users',
					},
				},
			},
			{
				name: 'Get User',
				value: 'getUser',
				action: 'Get a user',
				description: 'Get a specific user by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/users/{{ $parameter.userId }}',
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
		],
		default: 'getManyUsers',
	},
];

export const userFields: INodeProperties[] = [
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['users'],
				operation: ['getUser'],
			},
		},
		default: '',
		description: 'The ID of the user to retrieve',
	},
	{
		displayName: 'Person ID (Optional)',
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
				operation: ['update', 'createFromPerson'],
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
				operation: ['createFromPerson'],
			},
		},
		default: '',
		description: 'The ID of the person to create a user from',
	},
];
