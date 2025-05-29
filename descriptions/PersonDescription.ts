import type { INodeProperties } from 'n8n-workflow';

export const personOperations: INodeProperties[] = [
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
				name: 'Create Person',
				value: 'createPerson',
				action: 'Create a new person',
				description: 'Create a new person',
				routing: {
					request: {
						method: 'POST',
						url: '/persons',
						body: {
							id: 0,
							firstName: '={{ $parameter.firstName }}',
							lastName: '={{ $parameter.lastName }}',
							emailAddress: '={{ $parameter.emailAddress }}',
							tenantId: '={{ $parameter.tenantId }}',
							azurePrincipalId: '={{ $parameter.azurePrincipalId }}',
						},
					},
				},
			},
			{
				name: 'Delete Person',
				value: 'deletePerson',
				action: 'Delete a person',
				description: 'Delete a person by person ID',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/persons/{{ $parameter.personId }}',
					},
				},
			},
			{
				name: 'Get People',
				value: 'getPeople',
				action: 'Get people',
				description: 'Retrieve a list of people',
				routing: {
					request: {
						method: 'GET',
						url: '/persons',
					},
				},
			},
		],
		default: 'getPeople',
	},
	{
		displayName: 'First Name',
		name: 'firstName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['persons'],
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
				resource: ['persons'],
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
				resource: ['persons'],
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
				resource: ['persons'],
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
				resource: ['persons'],
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
				resource: ['persons'],
				operation: ['deletePerson'],
			},
		},
		default: '',
		description: 'The ID of the person to delete',
	}
]