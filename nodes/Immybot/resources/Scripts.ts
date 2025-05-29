import type { IImmybotOperationDescription } from '../types';
import type { IHttpRequestMethods } from 'n8n-workflow';

export const scriptOperations: IImmybotOperationDescription[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['scripts'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get all scripts',
				description: 'Get all scripts',
				routing: {
					request: {
						method: 'GET' as IHttpRequestMethods,
						url: '/scripts',
					},
				},
			},
			{
				name: 'Get by ID',
				value: 'getById',
				action: 'Get a script by ID',
				description: 'Get a specific script by its ID',
				routing: {
					request: {
						method: 'GET' as IHttpRequestMethods,
						url: '=/scripts/{{ $parameter.id }}',
					},
				},
			},
			{
				name: 'Get by Name',
				value: 'getByName',
				action: 'Get a script by name',
				description: 'Get a specific script by its name',
				routing: {
					request: {
						method: 'GET' as IHttpRequestMethods,
						url: '/scripts',
						qs: {
							name: '={{ $parameter.name }}',
						},
					},
				},
			},
			{
				name: 'Get by Tenant ID',
				value: 'getByTenantId',
				action: 'Get scripts by tenant ID',
				description: 'Get all scripts for a specific tenant',
				routing: {
					request: {
						method: 'GET' as IHttpRequestMethods,
						url: '/scripts',
						qs: {
							tenantId: '={{ $parameter.tenantId }}',
						},
					},
				},
			},
			{
				name: 'Create',
				value: 'create',
				action: 'Create a new script',
				description: 'Create a new script',
				routing: {
					request: {
						method: 'POST' as IHttpRequestMethods,
						url: '/scripts',
						body: {
							name: '={{ $parameter.name }}',
							description: '={{ $parameter.description }}',
							script: '={{ $parameter.script }}',
							tenantId: '={{ $parameter.tenantId }}',
							isPublic: '={{ $parameter.isPublic }}',
						},
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a script',
				description: 'Update an existing script',
				routing: {
					request: {
						method: 'PUT' as IHttpRequestMethods,
						url: '=/scripts/{{ $parameter.id }}',
						body: {
							name: '={{ $parameter.name }}',
							description: '={{ $parameter.description }}',
							script: '={{ $parameter.script }}',
							tenantId: '={{ $parameter.tenantId }}',
							isPublic: '={{ $parameter.isPublic }}',
						},
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a script',
				description: 'Delete a script by ID',
				routing: {
					request: {
						method: 'DELETE' as IHttpRequestMethods,
						url: '=/scripts/{{ $parameter.id }}',
					},
				},
			},
		],
		default: 'get',
	},
	{
		displayName: 'ID',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['scripts'],
				operation: ['getById', 'update', 'delete'],
			},
		},
		default: '',
		description: 'The ID of the script',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['scripts'],
				operation: ['getByName', 'create'],
			},
		},
		default: '',
		description: 'The name of the script',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['scripts'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The name of the script',
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['scripts'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		description: 'The description of the script',
	},
	{
		displayName: 'Script',
		name: 'script',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['scripts'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The script content',
	},
	{
		displayName: 'Script',
		name: 'script',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['scripts'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The script content',
	},
	{
		displayName: 'Tenant ID',
		name: 'tenantId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['scripts'],
				operation: ['getByTenantId', 'create'],
			},
		},
		default: '',
		description: 'The ID of the tenant',
	},
	{
		displayName: 'Tenant ID',
		name: 'tenantId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['scripts'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The ID of the tenant',
	},
	{
		displayName: 'Is Public',
		name: 'isPublic',
		type: 'boolean',
		required: true,
		displayOptions: {
			show: {
				resource: ['scripts'],
				operation: ['create'],
			},
		},
		default: false,
		description: 'Whether the script is public',
	},
	{
		displayName: 'Is Public',
		name: 'isPublic',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['scripts'],
				operation: ['update'],
			},
		},
		default: false,
		description: 'Whether the script is public',
	},
];
