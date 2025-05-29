import type { INodeProperties } from 'n8n-workflow';

export const tagOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'tags',
				],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a new tag',
				description: 'Create a new tag',
				routing: {
					request: {
						method: 'POST',
						url: '/tags',
						body: {
							name: '={{ $parameter.name }}',
							description: '={{ $parameter.description }}',
							color: '={{ $parameter.color }}',
						},
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a tag',
				description: 'Delete a tag by ID',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/tags/{{ $parameter.id }}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get all tags',
				description: 'Get all tags',
				routing: {
					request: {
						method: 'GET',
						url: '/tags',
						qs: {
							name: '={{ $parameter.filterName }}',
						},
					},
				},
			},
			{
				name: 'Get by ID',
				value: 'getById',
				action: 'Get a tag by ID',
				description: 'Get a specific tag by its ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/tags/{{ $parameter.id }}',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a tag',
				description: 'Update an existing tag by ID',
				routing: {
					request: {
						method: 'POST',
						url: '=/tags/{{ $parameter.id }}',
						body: {
							name: '={{ $parameter.name }}',
							description: '={{ $parameter.description }}',
							color: '={{ $parameter.color }}',
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
				resource: ['tags'],
				operation: ['getById', 'update', 'delete'],
			},
		},
		default: '',
		description: 'The ID of the tag',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['tags'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		description: 'The name of the tag',
	},
	{
		displayName: 'Filter by Name',
		name: 'filterName',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['tags'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'Filter tags by name (optional)',
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['tags'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		description: 'The description of the tag',
	},
	{
		displayName: 'Color',
		name: 'color',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['tags'],
				operation: ['create', 'update'],
			},
		},
		options: [
			{
				name: 'Black',
				value: 'black',
			},
			{
				name: 'Blue',
				value: 'blue',
			},
			{
				name: 'Danger',
				value: 'danger',
			},
			{
				name: 'Orange',
				value: 'orange',
			},
			{
				name: 'Primary',
				value: 'primary',
			},
			{
				name: 'Purple',
				value: 'purple',
			},
			{
				name: 'Secondary',
				value: 'secondary',
			},
			{
				name: 'Success',
				value: 'success',
			},
			{
				name: 'Warning',
				value: 'warning',
			},
		],
		default: 'primary',
		description: 'The color of the tag',
	}
];
