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
						qs: {
							filters: '={{ $parameter.filters }}',
						},
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
		displayName: 'Filter (This Is Not A Plain Text Filter. Example: name==Example Company Inc.)',
		name: 'filters',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['tenants'],
				operation: ['getAll'],
			},
		},
		default: '',
		description: 'Filter tenants by name (optional)',
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
	}
]
