import type { IImmybotOperationDescription } from '../types';
import type { IHttpRequestMethods } from 'n8n-workflow';

export const computerOperations: IImmybotOperationDescription[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['computers'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get all computers',
				description: 'Get all computers',
				routing: {
					request: {
						method: 'GET' as IHttpRequestMethods,
						url: '/computers',
					},
				},
			},
			{
				name: 'Get by ID',
				value: 'getById',
				action: 'Get a computer by ID',
				description: 'Get a specific computer by its ID',
				routing: {
					request: {
						method: 'GET' as IHttpRequestMethods,
						url: '=/computers/{{ $parameter.id }}',
					},
				},
			},
			{
				name: 'Get by Name',
				value: 'getByName',
				action: 'Get a computer by name',
				description: 'Get a specific computer by its name',
				routing: {
					request: {
						method: 'GET' as IHttpRequestMethods,
						url: '/computers',
						qs: {
							name: '={{ $parameter.name }}',
						},
					},
				},
			},
			{
				name: 'Get by Tenant ID',
				value: 'getByTenantId',
				action: 'Get computers by tenant ID',
				description: 'Get all computers for a specific tenant',
				routing: {
					request: {
						method: 'GET' as IHttpRequestMethods,
						url: '/computers',
						qs: {
							tenantId: '={{ $parameter.tenantId }}',
						},
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
				resource: ['computers'],
				operation: ['getById'],
			},
		},
		default: '',
		description: 'The ID of the computer',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['computers'],
				operation: ['getByName'],
			},
		},
		default: '',
		description: 'The name of the computer',
	},
	{
		displayName: 'Tenant ID',
		name: 'tenantId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['computers'],
				operation: ['getByTenantId'],
			},
		},
		default: '',
		description: 'The ID of the tenant',
	},
];
