import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
	ICredentialTestRequest,
	Icon,
} from 'n8n-workflow';

import { CREDENTIAL_TYPE_NAME } from '../nodes/ScrapingBee/typeNames';

export class ScrapingBeeApi implements ICredentialType {
	name = CREDENTIAL_TYPE_NAME;
	displayName = 'ScrapingBee API';
	icon: Icon = { light: 'file:scrapingbee.svg', dark: 'file:scrapingbee.svg' };
	documentationUrl = 'https://www.scrapingbee.com/documentation/';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://app.scrapingbee.com/api/v1/',
			url: 'usage',
		},
	};


}
