import type { IExecuteFunctions, ILoadOptionsFunctions, INodeProperties, NodePropertyTypes, IHttpRequestMethods } from 'n8n-workflow';

export interface ImmybotCredentials {
	clientId: string;
	clientSecret: string;
	scope: string;
}

export interface IImmybotResource {
	resource: string;
	operation: string;
}

export interface IImmybotOperation {
	resource: string;
	operation: string;
}

export interface IImmybotOperationOptions {
	resource: string;
	operation: string;
}

export interface IImmybotOperationDescription extends INodeProperties {
	displayName: string;
	name: string;
	type: NodePropertyTypes;
	noDataExpression?: boolean;
	displayOptions?: {
		show: {
			resource: string[];
			operation?: string[];
		};
	};
	options?: Array<{
		name: string;
		value: string;
		action: string;
		description: string;
		routing?: {
			request: {
				method: IHttpRequestMethods;
				url: string;
				body?: any;
				qs?: any;
			};
		};
	}>;
	default: string | number | boolean;
	required?: boolean;
	description?: string;
}

export interface IImmybotResourceDescription {
	displayName: string;
	name: string;
	icon: string;
	version: number;
	subtitle: string;
	description: string;
	defaults: {
		name: string;
	};
	inputs: string[];
	outputs: string[];
	credentials: Array<{
		name: string;
		required: boolean;
	}>;
	requestDefaults: {
		baseURL: string;
		headers: {
			Accept: string;
			'Content-Type': string;
		};
	};
	properties: IImmybotOperationDescription[];
}
