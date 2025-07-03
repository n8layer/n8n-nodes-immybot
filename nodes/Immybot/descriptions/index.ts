import type { INodeProperties } from 'n8n-workflow';

import { tagOperations, tagFields } from './TagDescription';
import { providerLinkOperations, providerLinkFields } from './ProviderLinkDescription';
import { computerOperations, computerFields } from './ComputerDescription';
import { maintenanceOperations, maintenanceFields } from './MaintenanceDescription';
import { tenantOperations, tenantFields } from './TenantDescription';
import { userOperations, userFields } from './UserDescription';
import { personOperations, personFields } from './PersonDescription';

export const resourceOptions: INodeProperties = {
	displayName: 'Resource',
	name: 'resource',
	type: 'options',
	noDataExpression: true,
	options: [
		{
			name: 'Computer',
			value: 'computers',
		},
		{
			name: 'Maintenance',
			value: 'maintenance',
		},
		{
			name: 'Person',
			value: 'persons',
		},
		{
			name: 'Provider Link',
			value: 'providerLinks',
		},
		{
			name: 'Tag',
			value: 'tags',
		},
		{
			name: 'Tenant',
			value: 'tenants',
		},
		{
			name: 'User',
			value: 'users',
		},
	],
	default: 'tags',
};

export const operations: INodeProperties[] = [
	...tagOperations,
	...providerLinkOperations,
	...computerOperations,
	...maintenanceOperations,
	...tenantOperations,
	...userOperations,
	...personOperations,
];

export const fields: INodeProperties[] = [
	...tagFields,
	...providerLinkFields,
	...computerFields,
	...maintenanceFields,
	...tenantFields,
	...userFields,
	...personFields,
];


