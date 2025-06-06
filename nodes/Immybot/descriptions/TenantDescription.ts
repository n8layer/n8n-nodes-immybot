import type { INodeProperties } from 'n8n-workflow';

export const tenantOperations: INodeProperties[] = [
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
				name: 'Delete',
				value: 'delete',
				action: 'Delete tenants',
				description: 'Delete tenants',
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
				name: 'Get Many Tenants',
				value: 'getManyTenants',
				action: 'Get many tenants',
				description: 'Get all tenants with optional name filtering',
				routing: {
					request: {
						method: 'GET',
						url: '/tenants',
						qs: {
							filters: '={{ $parameter.filters }}',
						},
					},
				},
			},
			{
				name: 'Get Tenant',
				value: 'getTenant',
				action: 'Get a tenant',
				description: 'Get a specific tenant by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/tenants/{{ $parameter.tenantId }}',
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
		default: 'getManyTenants',
	},
];

export const tenantFields: INodeProperties[] = [
	{
		displayName: 'Tenant ID',
		name: 'tenantId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['tenants'],
				operation: ['getTenant'],
			},
		},
		default: '',
		description: 'The ID of the tenant to retrieve',
	},
	{
		displayName: 'Name Filter (Optional)',
		name: 'filters',
		type: 'string',
		noDataExpression: false,
		displayOptions: {
			show: {
				resource: ['tenants'],
				operation: ['getManyTenants'],
			},
		},
		default: '',
		description: 'Filter tenants by name. Example: (name==Example Company Inc.). Leave empty to get all tenants.',
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
				operation: ['create', 'update'],
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
				operation: ['create', 'update'],
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
				operation: ['create', 'update'],
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
				operation: ['create', 'update'],
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
		displayName: 'IDs',
		name: 'ids',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['tenants'],
				operation: ['delete'],
			},
		},
		default: '[]',
		description: 'Enter a JSON array of tenant IDs to delete (e.g. ["297", "298"])',
	},
];
