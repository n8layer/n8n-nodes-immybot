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
				name: 'Get Many Tags',
				value: 'getManyTags',
				action: 'Get many tags',
				description: 'Get all tags',
				routing: {
					request: {
						method: 'GET',
						url: '/tags',
					},
				},
			},
			{
				name: 'Get Tag',
				value: 'getTag',
				action: 'Get a tag',
				description: 'Get a specific tag by ID or name',
				routing: {
					request: {
						method: 'GET',
						url: '={{ $parameter.filterType === "id" ? `/tags/${$parameter.id}` : "/tags" }}',
						qs: {
							name: '={{ $parameter.filterType === "name" ? $parameter.filterName : undefined }}',
						},
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
		default: 'getManyTags',
	},
];

export const tagFields: INodeProperties[] = [
	{
		displayName: 'Filter Type',
		name: 'filterType',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['tags'],
				operation: ['getTag'],
			},
		},
		options: [
			{
				name: 'By ID',
				value: 'id',
			},
			{
				name: 'By Name',
				value: 'name',
			},
		],
		default: 'id',
		description: 'Choose whether to filter by tag ID or name',
	},
	{
		displayName: 'ID',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['tags'],
				operation: ['getTag'],
				filterType: ['id'],
			},
		},
		default: '',
		description: 'The ID of the tag',
	},
	{
		displayName: 'ID',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['tags'],
				operation: ['update', 'delete'],
			},
		},
		default: '',
		description: 'The ID of the tag',
	},
	{
		displayName: 'Name',
		name: 'filterName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['tags'],
				operation: ['getTag'],
				filterType: ['name'],
			},
		},
		default: '',
		description: 'The name of the tag to filter by',
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
	},
];
