import type { IImmybotOperationDescription } from '../types';
import type { IHttpRequestMethods } from 'n8n-workflow';

export const personOperations: IImmybotOperationDescription[] = [
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
				name: 'Get',
				value: 'get',
				action: 'Get all persons',
				description: 'Get all persons',
				routing: {
					request: {
						method: 'GET' as IHttpRequestMethods,
						url: '/persons',
					},
				},
			},
			{
				name: 'Get by ID',
				value: 'getById',
				action: 'Get a person by ID',
				description: 'Get a specific person by their ID',
				routing: {
					request: {
						method: 'GET' as IHttpRequestMethods,
						url: '=/persons/{{ $parameter.id }}',
					},
				},
			},
			{
				name: 'Get by Email',
				value: 'getByEmail',
				action: 'Get a person by email',
				description: 'Get a specific person by their email address',
				routing: {
					request: {
						method: 'GET' as IHttpRequestMethods,
						url: '/persons',
						qs: {
							email: '={{ $parameter.email }}',
						},
					},
				},
			},
			{
				name: 'Get by Tenant ID',
				value: 'getByTenantId',
				action: 'Get persons by tenant ID',
				description: 'Get all persons for a specific tenant',
				routing: {
					request: {
						method: 'GET' as IHttpRequestMethods,
						url: '/persons',
						qs: {
							tenantId: '={{ $parameter.tenantId }}',
						},
					},
				},
			},
			{
				name: 'Create',
				value: 'create',
				action: 'Create a new person',
				description: 'Create a new person',
				routing: {
					request: {
						method: 'POST' as IHttpRequestMethods,
						url: '/persons',
						body: {
							email: '={{ $parameter.email }}',
							firstName: '={{ $parameter.firstName }}',
							lastName: '={{ $parameter.lastName }}',
							tenantId: '={{ $parameter.tenantId }}',
							hasManagementAccess: '={{ $parameter.hasManagementAccess }}',
						},
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a person',
				description: 'Update an existing person',
				routing: {
					request: {
						method: 'PUT' as IHttpRequestMethods,
						url: '=/persons/{{ $parameter.id }}',
						body: {
							email: '={{ $parameter.email }}',
							firstName: '={{ $parameter.firstName }}',
							lastName: '={{ $parameter.lastName }}',
							tenantId: '={{ $parameter.tenantId }}',
							hasManagementAccess: '={{ $parameter.hasManagementAccess }}',
						},
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a person',
				description: 'Delete a person by ID',
				routing: {
					request: {
						method: 'DELETE' as IHttpRequestMethods,
						url: '=/persons/{{ $parameter.id }}',
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
				resource: ['persons'],
				operation: ['getById', 'update', 'delete'],
			},
		},
		default: '',
		description: 'The ID of the person',
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['persons'],
				operation: ['getByEmail', 'create'],
			},
		},
		default: '',
		description: 'The email address of the person',
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['persons'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The email address of the person',
	},
	{
		displayName: 'First Name',
		name: 'firstName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['persons'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The first name of the person',
	},
	{
		displayName: 'First Name',
		name: 'firstName',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['persons'],
				operation: ['update'],
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
				operation: ['create'],
			},
		},
		default: '',
		description: 'The last name of the person',
	},
	{
		displayName: 'Last Name',
		name: 'lastName',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['persons'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The last name of the person',
	},
	{
		displayName: 'Tenant ID',
		name: 'tenantId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['persons'],
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
				resource: ['persons'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The ID of the tenant',
	},
	{
		displayName: 'Has Management Access',
		name: 'hasManagementAccess',
		type: 'boolean',
		required: true,
		displayOptions: {
			show: {
				resource: ['persons'],
				operation: ['create'],
			},
		},
		default: false,
		description: 'Whether the person has management access',
	},
	{
		displayName: 'Has Management Access',
		name: 'hasManagementAccess',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['persons'],
				operation: ['update'],
			},
		},
		default: false,
		description: 'Whether the person has management access',
	},
];
