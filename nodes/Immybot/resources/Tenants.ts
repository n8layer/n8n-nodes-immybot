import type { IImmybotOperationDescription } from '../types';
import type { IHttpRequestMethods } from 'n8n-workflow';

export const tenantOperations: IImmybotOperationDescription[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['tenants'],
			},
		},
		options: [
			{
				name: 'Bulk Delete',
				value: 'bulkDelete',
				action: 'Bulk delete tenants',
				description: 'Delete multiple tenants by their IDs',
				routing: {
					request: {
						method: 'POST' as IHttpRequestMethods,
						url: '/tenants/bulk-delete',
						body: {
							ids: '={{ $parameter.ids }}',
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
						method: 'POST' as IHttpRequestMethods,
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
						method: 'GET' as IHttpRequestMethods,
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
						method: 'PUT' as IHttpRequestMethods,
						url: '=/tenants/{{ $parameter.id }}',
						body: {
							name: '={{ $parameter.name }}',
							slug: '={{ $parameter.slug }}',
							parentTenantId: '={{ $parameter.parentTenantId }}',
							isMsp: '={{ $parameter.isMsp }}',
						},
					},
				},
			},
		],
		default: 'getAll',
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
		description: 'The ID of the tenant to retrieve',
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
		default: '',
		description: 'The ID of the tenant to update',
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
		description: 'The slug of the tenant',
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
		default: '',
		description: 'The ID of the parent tenant',
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
		description: 'Whether the tenant is a Managed Service Provider',
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
		default: '',
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
				operation: ['bulkDelete'],
			},
		},
		default: '',
		description: 'JSON array of tenant IDs to delete',
	},
];
