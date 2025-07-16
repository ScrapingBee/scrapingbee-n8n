import { IAuthenticateGeneric, ICredentialType, INodeProperties, ICredentialTestRequest } from 'n8n-workflow';

export class ScrapingBeeApi implements ICredentialType {
	// eslint-disable-next-line n8n-nodes-base/cred-class-field-name-uppercase-first-char
	name = 'ScrapingBeeApi';
	displayName = 'ScrapingBee API';
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
			qs: {
				api_key: '={{$credentials.apiKey}}',
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
