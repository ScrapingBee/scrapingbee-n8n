import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
	NodeConnectionType,
	INodeInputConfiguration,
	INodeOutputConfiguration,
	IHttpRequestOptions,
} from 'n8n-workflow';

export class ScrapingBee implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'ScrapingBee',
		// eslint-disable-next-line n8n-nodes-base/node-class-description-name-miscased
		name: 'ScrapingBee',
		icon: 'file:scrapingbee.svg',
		group: ['transform'],
		version: 1,
		usableAsTool: true,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Scrape websites using ScrapingBee',
		defaults: {
			name: 'ScrapingBee',
		},
		inputs: ['main'] as (NodeConnectionType | INodeInputConfiguration)[],
		outputs: ['main'] as (NodeConnectionType | INodeOutputConfiguration)[],
		credentials: [
			{
				name: 'ScrapingBeeApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Amazon Pricing API',
						value: 'amazonPricingAPI',
					},
					{
						name: 'Amazon Product API',
						value: 'amazonProductAPI',
					},
					{
						name: 'Amazon Search API',
						value: 'amazonSearchAPI',
					},
					{
						name: 'ChatGPT API',
						value: 'chatgptAPI',
					},
					{
						name: 'Fast Search API',
						value: 'fastSearchAPI',
					},
					{
						name: 'Gemini API',
						value: 'geminiAPI',
					},
					{
						name: 'Google Search API',
						value: 'googleSearchAPI',
					},
					{
						name: 'HTML API',
						value: 'htmlAPI',
					},
					{
						name: 'Usage',
						value: 'usage',
					},
					{
						name: 'Walmart Product API',
						value: 'walmartProductAPI',
					},
					{
						name: 'Walmart Search API',
						value: 'walmartSearchAPI',
					},
					{
						name: 'YouTube Metadata API',
						value: 'youtubeMetadataAPI',
					},
					{
						name: 'YouTube Search API',
						value: 'youtubeSearchAPI',
					},
					{
						name: 'YouTube Subtitles API',
						value: 'youtubeSubtitlesAPI',
					},
				],
				default: 'htmlAPI',
			},
			// Operations for HTML API
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['htmlAPI'],
					},
				},
				options: [
					{
						name: 'GET',
						value: 'get',
						action: 'Scrape using HTML API',
						description: 'Scrape the webpage using our HTML API',
					},
					{
						name: 'POST',
						value: 'post',
						action: 'Send POST request using HTML API',
						description: 'Send a post request using our HTML API',
					},
					{
						name: 'PUT',
						value: 'put',
						action: 'Send PUT request using HTML API',
						description: 'Send a put request using our HTML API',
					},
				],
				default: 'get',
			},
			// Operation for Google Search API
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['googleSearchAPI'],
					},
				},
				options: [
					{
						name: 'GET',
						value: 'get',
						action: 'Get SERP data using GOOGLE SEARCH API',
						description: 'Get SERP data using our Google Search API',
					},
				],
				default: 'get',
			},
			// Operation for Fast Search API
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['fastSearchAPI'],
					},
				},
				options: [
					{
						name: 'GET',
						value: 'get',
						action: 'Get lightweight SERP data using FAST SEARCH API',
						description: 'Get lightweight, low-latency Google search results',
					},
				],
				default: 'get',
			},
			// Operation for Walmart Search API
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['walmartSearchAPI'],
					},
				},
				options: [
					{
						name: 'GET',
						value: 'get',
						action: 'Get products related to search query using WALMART SEARCH API',
						description: 'Search for products in Walmart',
					},
				],
				default: 'get',
			},
			// Operation for Walmart Product API
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['walmartProductAPI'],
					},
				},
				options: [
					{
						name: 'GET',
						value: 'get',
						action: 'Get product information using WALMART PRODUCT API',
						description: 'Get product information from Walmart',
					},
				],
				default: 'get',
			},
			// Operation for Amazon Search API
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['amazonSearchAPI'],
					},
				},
				options: [
					{
						name: 'GET',
						value: 'get',
						action: 'Get products related to search query using AMAZON SEARCH API',
						description: 'Search for products in Amazon',
					},
				],
				default: 'get',
			},
			// Operation for Amazon Product API
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['amazonProductAPI'],
					},
				},
				options: [
					{
						name: 'GET',
						value: 'get',
						action: 'Get product information using AMAZON PRODUCT API',
						description: 'Get product information from Amazon',
					},
				],
				default: 'get',
			},
			// Operation for Amazon Pricing API
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['amazonPricingAPI'],
					},
				},
				options: [
					{
						name: 'GET',
						value: 'get',
						action: 'Get pricing offers and seller information using AMAZON PRICING API',
						description: 'Get pricing, offers, and seller information from Amazon',
					},
				],
				default: 'get',
			},
			// Operation for ChatGPT API
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['chatgptAPI'],
					},
				},
				options: [
					{
						name: 'GET',
						value: 'get',
						action: 'Get AI response from CHATGPT for your prompt using our CHATGPT API',
						description: 'Get AI Response from ChatGPT based on your prompt',
					},
				],
				default: 'get',
			},
			// Operation for Gemini API
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['geminiAPI'],
					},
				},
				options: [
					{
						name: 'GET',
						value: 'get',
						action: 'Get AI response from GEMINI for your prompt using our GEMINI API',
						description: 'Get AI Response from Gemini based on your prompt',
					},
				],
				default: 'get',
			},
			// Operation for Usage
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['usage'],
					},
				},
				options: [
					{
						name: 'GET',
						value: 'get',
						action: 'Get usage data',
						description: 'Get your API usage data',
					},
				],
				default: 'get',
			},
			// Operation for YouTube Metadata API
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['youtubeMetadataAPI'],
					},
				},
				options: [
					{
						name: 'GET',
						value: 'get',
						action: 'Get detailed video metadata from YOUTUBE using our YOUTUBE METADATA API',
						description: 'Get detailed video metadata',
					},
				],
				default: 'get',
			},
			// Operation for YouTube Search API
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['youtubeSearchAPI'],
					},
				},
				options: [
					{
						name: 'GET',
						value: 'get',
						action: 'Get search results from YOUTUBE using our YOUTUBE SEARCH API',
						description: 'Get YouTube search results',
					},
				],
				default: 'get',
			},
			// Operation for YouTube Subtitles API
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['youtubeSubtitlesAPI'],
					},
				},
				options: [
					{
						name: 'GET',
						value: 'get',
						action: 'Get video subtitles from YOUTUBE using our YOUTUBE SUBTITLES API',
						description: 'Get video subtitles/captions (transcripts)',
					},
				],
				default: 'get',
			},
			// Add required fields here
			{
				displayName: 'URL',
				description: 'Target webpage to scrape',
				required: true,
				name: 'url',
				type: 'string',
				default: 'http://httpbin.org/anything?json',
				displayOptions: {
					show: {
						resource: ['htmlAPI'],
					},
				},
			},
			{
				displayName: 'Forward Headers',
				name: 'forwardHeaders',
				type: 'boolean',
				default: false,
				description:
					'Whether to forward particular headers to the webpage, as well as other headers generated by ScrapingBee or not',
				displayOptions: {
					show: {
						resource: ['htmlAPI'],
					},
				},
			},
			{
				displayName: 'Specify Headers As',
				name: 'specifyHeaders',
				type: 'options',
				options: [
					{ name: 'Key/Value Pairs', value: 'keypair' },
					{ name: 'Raw JSON', value: 'json' },
				],
				default: 'keypair',
				displayOptions: {
					show: {
						forwardHeaders: [true],
						resource: ['htmlAPI'],
					},
				},
			},
			{
				displayName: 'Headers (JSON)',
				name: 'jsonHeadersParameter',
				type: 'json',
				description: 'Please prefix headers with "Spb-"',
				default: '',
				displayOptions: {
					show: {
						forwardHeaders: [true],
						specifyHeaders: ['json'],
						resource: ['htmlAPI'],
					},
				},
			},
			{
				displayName: 'Headers (Key/Value)',
				name: 'headerParameters',
				type: 'fixedCollection',
				description: 'No need to prefix headers with "Spb-", we are already taking care of it here',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				placeholder: 'Add Header',
				options: [
					{
						name: 'header',
						displayName: 'Header',
						values: [
							{
								displayName: 'Name',
								name: 'name',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
							},
						],
					},
				],
				displayOptions: {
					show: {
						forwardHeaders: [true],
						specifyHeaders: ['keypair'],
						resource: ['htmlAPI'],
					},
				},
			},
			{
				displayName: 'Send Body',
				name: 'sendBody',
				type: 'boolean',
				default: false,
				description: 'Whether to send a body with the request',
				displayOptions: {
					show: {
						resource: ['htmlAPI'],
						operation: ['post', 'put'],
					},
				},
			},
			{
				displayName: 'Body Content Type',
				name: 'bodyContentType',
				type: 'options',
				options: [
					{
						name: 'Form Urlencoded',
						value: 'formUrlencoded',
					},
					{
						name: 'JSON',
						value: 'json',
					},
					{
						name: 'Raw',
						value: 'raw',
					},
				],
				default: 'formUrlencoded',
				description: 'Content-Type to use to send body data',
				displayOptions: {
					show: {
						sendBody: [true],
						resource: ['htmlAPI'],
						operation: ['post', 'put'],
					},
				},
			},
			{
				displayName: 'Body',
				name: 'bodyParameters',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				placeholder: 'Add Parameter',
				default: {},
				displayOptions: {
					show: {
						bodyContentType: ['formUrlencoded'],
						sendBody: [true],
						resource: ['htmlAPI'],
						operation: ['post', 'put'],
					},
				},
				options: [
					{
						name: 'parameter',
						displayName: 'Parameter',
						values: [
							{
								displayName: 'Name',
								name: 'name',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
							},
						],
					},
				],
			},
			{
				displayName: 'Body',
				name: 'jsonBodyParameter',
				type: 'json',
				default: '',
				displayOptions: {
					show: {
						bodyContentType: ['json'],
						sendBody: [true],
						resource: ['htmlAPI'],
						operation: ['post', 'put'],
					},
				},
			},
			{
				displayName: 'Body',
				name: 'rawBodyParameter',
				type: 'string',
				typeOptions: {
					alwaysOpenEditWindow: true,
				},
				default: '',
				displayOptions: {
					show: {
						bodyContentType: ['raw'],
						sendBody: [true],
						resource: ['htmlAPI'],
						operation: ['post', 'put'],
					},
				},
			},
			{
				displayName: 'Content-Type',
				name: 'rawContentType',
				type: 'string',
				default: 'text/plain',
				description: 'The Content-Type of the raw body',
				displayOptions: {
					show: {
						bodyContentType: ['raw'],
						sendBody: [true],
						resource: ['htmlAPI'],
						operation: ['post', 'put'],
					},
				},
			},
			{
				displayName: 'Search',
				description: 'Enter your search query',
				required: true,
				name: 'search',
				type: 'string',
				default: 'pizza',
				displayOptions: {
					show: {
						resource: ['googleSearchAPI', 'fastSearchAPI', 'youtubeSearchAPI'],
					},
				},
			},
			{
				displayName: 'Query',
				description: 'Enter your search query',
				required: true,
				name: 'query',
				type: 'string',
				default: 'mobile',
				displayOptions: {
					show: {
						resource: ['walmartSearchAPI', 'amazonSearchAPI'],
					},
				},
			},
			{
				displayName: 'Product ID',
				description: 'Walmart product identifier',
				required: true,
				name: 'productId',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['walmartProductAPI'],
					},
				},
			},
			{
				displayName: 'Query',
				description: 'Search query (must be a valid 10-character ASIN code)',
				required: true,
				name: 'query',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['amazonProductAPI'],
					},
				},
			},
			{
				displayName: 'Prompt',
				description: 'The prompt you want to send to the AI model',
				required: true,
				name: 'prompt',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['chatgptAPI', 'geminiAPI'],
					},
				},
			},
			{
				displayName: 'ASIN',
				description: 'Amazon product identifier (must be a valid 10-character ASIN code)',
				required: true,
				name: 'asin',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['amazonPricingAPI'],
					},
				},
			},
			{
				displayName: 'Video ID',
				description: 'YouTube Video ID',
				required: true,
				name: 'videoId',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						resource: ['youtubeMetadataAPI', 'youtubeSubtitlesAPI'],
					},
				},
			},
			// Additional Fields for HTML API
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				default: {},
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						resource: ['htmlAPI'],
					},
				},
				options: [
					{
						displayName: 'AI Data Extraction',
						name: 'aiExtractRules',
						type: 'json',
						default: '',
						description: 'Data extraction from description using AI',
					},
					{
						displayName: 'AI Query',
						name: 'aiQuery',
						type: 'string',
						default: '',
						description: 'The information you want to extract from the webpage using AI',
					},
					{
						displayName: 'AI Selector',
						name: 'aiSelector',
						type: 'string',
						default: '',
						description: 'CSS selector to focus the AI extraction on a specific part of the page',
					},
					{
						displayName: 'Block Ads',
						name: 'blockAds',
						type: 'boolean',
						default: false,
						description: 'Whether to block ads on the page you want to scrape or not',
					},
					{
						displayName: 'Block Resources',
						name: 'blockResources',
						type: 'boolean',
						default: true,
						description: 'Whether to block images and CSS on the page you want to scrape or not',
					},
					{
						displayName: 'Cookies',
						name: 'cookies',
						type: 'string',
						default: '',
						description: 'Pass custom cookies to the webpage you want to scrape',
						hint: 'name=value,other_attributes=other_attribues_value;',
					},
					{
						displayName: 'Country Code',
						name: 'countryCode',
						type: 'string',
						default: '',
						description: 'Premium proxy geolocation',
					},
					{
						displayName: 'Device',
						name: 'device',
						type: 'options',
						description: 'Control the device the request will be sent from',
						options: [
							{ name: 'Desktop', value: 'desktop' },
							{ name: 'Mobile', value: 'mobile' },
						],
						default: 'desktop',
					},
					{
						displayName: 'Extract Data',
						name: 'extractRules',
						type: 'json',
						default: '',
						description: 'Data extraction from CSS selectors',
					},
					{
						displayName: 'Forward Headers Pure',
						name: 'forwardHeadersPure',
						type: 'boolean',
						default: false,
						description:
							'Whether to forward only particular headers to the webpage, and nothing else or not',
					},
					{
						displayName: 'JS Scenario',
						name: 'js_scenario',
						type: 'json',
						default: '',
						description: 'JavaScript scenario to execute',
					},
					{
						displayName: 'JSON Response',
						name: 'jsonResponse',
						type: 'boolean',
						default: false,
						description: 'Whether to wrap response in JSON or not',
					},
					{
						displayName: 'Max Cost',
						name: 'maxCost',
						type: 'number',
						default: '',
						description:
							'Maximum credit tier Auto-Mode may attempt (requires Mode to be set to Auto)',
					},
					{
						displayName: 'Mode',
						name: 'mode',
						type: 'options',
						description:
							'Auto-Mode escalates through proxy/rendering tiers until one succeeds and only charges the successful tier. GET only; cannot be combined with Render JS, Premium Proxy, Stealth Proxy, or Transparent Status Code.',
						options: [{ name: 'Auto', value: 'auto' }],
						// eslint-disable-next-line n8n-nodes-base/node-param-default-wrong-for-options
						default: '',
					},
					{
						displayName: 'Own Proxy',
						name: 'ownProxy',
						type: 'string',
						default: '',
						description: 'Allows you to use ScrapingBee with your own proxy provider',
					},
					{
						displayName: 'Premium Proxy',
						name: 'premiumProxy',
						type: 'boolean',
						default: false,
						description:
							'Whether to use premium proxies to bypass difficult to scrape websites or not',
					},
					{
						displayName: 'Render JS',
						name: 'renderJs',
						type: 'boolean',
						default: true,
						description:
							'Whether to render the JavaScript on the page with a headless browser or not',
					},
					{
						displayName: 'Return Page Markdown',
						name: 'returnPageMarkdown',
						type: 'boolean',
						default: false,
						description: 'Whether to return the page content in markdown format or not',
					},
					{
						displayName: 'Return Page Source',
						name: 'returnPageSource',
						type: 'boolean',
						default: false,
						description:
							'Whether to return the original HTML before the JavaScript rendering or not',
					},
					{
						displayName: 'Return Page Text',
						name: 'returnPageText',
						type: 'boolean',
						default: false,
						description: 'Whether to only return clean text from the page or not',
					},
					{
						displayName: 'Scraping Configuration',
						name: 'scrapingConfig',
						type: 'string',
						default: '',
						description: 'Use a pre-saved request configuration on your request',
					},
					{
						displayName: 'Screenshot',
						name: 'screenshot',
						type: 'boolean',
						default: false,
						description: 'Whether to return a screenshot of the page you want to scrape or not',
					},
					{
						displayName: 'Screenshot Full Page',
						name: 'screenshotFullPage',
						type: 'boolean',
						default: false,
						description:
							'Whether to Return a screenshot of the full page you want to scrape or not',
					},
					{
						displayName: 'Screenshot Selector',
						name: 'screenshotSelector',
						type: 'string',
						default: '',
						description:
							'Return a screenshot of a particular area of the page, targeted by a CSS selector',
					},
					{
						displayName: 'Session ID',
						name: 'sessionId',
						type: 'number',
						default: '',
						description: 'Route multiple API requests through the same IP address',
					},
					{
						displayName: 'Stealth Proxy',
						name: 'stealthProxy',
						type: 'boolean',
						default: false,
						description: 'Whether to use special stealth proxy pool or not',
					},
					{
						displayName: 'Tag',
						name: 'tag',
						type: 'string',
						default: '',
						description:
							'Label returned in the response headers; does not affect scraping behavior',
					},
					{
						displayName: 'Timeout',
						name: 'timeout',
						type: 'number',
						default: 140000,
						description: 'Timeout for your requests',
					},
					{
						displayName: 'Transparent Status Code',
						name: 'transparentStatusCode',
						type: 'boolean',
						default: false,
						description:
							'Whether to transparently return the same HTTP code of the page requested or not',
					},
					{
						displayName: 'Wait',
						name: 'wait',
						type: 'number',
						default: '',
						description: 'Additional time in ms for JavaScript to render',
					},
					{
						displayName: 'Wait Browser',
						name: 'waitBrowser',
						type: 'options',
						description: 'Control the device the request will be sent from',
						options: [
							{ name: 'Domcontentloaded', value: 'domcontentloaded' },
							{ name: 'Load', value: 'load' },
							{ name: 'Networkidle0', value: 'networkidle0' },
							{ name: 'Networkidle2', value: 'networkidle2' },
						],
						default: 'domcontentloaded',
					},
					{
						displayName: 'Wait For',
						name: 'waitFor',
						type: 'string',
						default: '',
						description: 'CSS / XPath selector to wait for in the DOM',
					},
					{
						displayName: 'Window Height',
						name: 'windowHeight',
						type: 'number',
						default: 1080,
						description:
							'Height, in pixel, of the viewport used to render the page you want to scrape',
					},
					{
						displayName: 'Window Width',
						name: 'windowWidth',
						type: 'number',
						default: 1920,
						description:
							'Width, in pixel, of the viewport used to render the page you want to scrape',
					},
				],
			},
			// Additional Fields for Google Search API
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				default: {},
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						resource: ['googleSearchAPI'],
					},
				},
				options: [
					{
						displayName: 'Add HTML',
						name: 'addHtml',
						type: 'boolean',
						default: false,
						description: 'Whether to add the full html of the page in the results or not',
					},
					{
						displayName: 'Country Code',
						name: 'countryCode',
						type: 'string',
						default: 'us',
						description: 'Country code from which you would like the request to come from',
					},
					{
						displayName: 'Date Range',
						name: 'dateRange',
						type: 'options',
						description:
							'Filter results by date; only applies to classic, news, and images search types',
						options: [
							{ name: 'Any Time', value: '' },
							{ name: 'Past Day', value: 'past_day' },
							{ name: 'Past Hour', value: 'past_hour' },
							{ name: 'Past Month', value: 'past_month' },
							{ name: 'Past Week', value: 'past_week' },
							{ name: 'Past Year', value: 'past_year' },
						],
						default: '',
					},
					{
						displayName: 'Device',
						name: 'device',
						type: 'options',
						description: 'Control the device the request will be sent from',
						options: [
							{ name: 'Desktop', value: 'desktop' },
							{ name: 'Mobile', value: 'mobile' },
						],
						default: 'desktop',
					},
					{
						displayName: 'Disable Autocorrection',
						name: 'nfpr',
						type: 'boolean',
						default: false,
						description:
							'Whether to exclude results from auto-corrected queries that were spelt wrong or not',
					},
					{
						displayName: 'Extra Params',
						name: 'extraParams',
						type: 'string',
						default: '',
						description: 'Extra Google URL parameters',
						hint: 'You can also pass multiple parameters, separated by &: example: tbs=qdr:d&lr=lang_fr',
					},
					{
						displayName: 'Language',
						name: 'language',
						type: 'string',
						default: 'en',
						description: 'Language the search results will be displayed in',
					},
					{
						displayName: 'Latitude',
						name: 'latitude',
						type: 'string',
						default: '',
						description:
							'Latitude in decimal degrees for geo-targeted search; must be supplied together with longitude',
					},
					{
						displayName: 'Light Request',
						name: 'lightRequest',
						type: 'boolean',
						default: true,
						description:
							'Whether to use a light request (faster and cheaper). Set to false to force a regular browser request, which is needed for AI Overviews.',
					},
					{
						displayName: 'Longitude',
						name: 'longitude',
						type: 'string',
						default: '',
						description:
							'Longitude in decimal degrees for geo-targeted search; must be supplied together with latitude',
					},
					{
						displayName: 'Max Price',
						name: 'maxPrice',
						type: 'string',
						default: '',
						description: 'Maximum price filter; only applies to the shopping search type',
					},
					{
						displayName: 'Min Price',
						name: 'minPrice',
						type: 'string',
						default: '',
						description: 'Minimum price filter; only applies to the shopping search type',
					},
					{
						displayName: 'Page',
						name: 'page',
						type: 'number',
						default: 1,
						description: 'The page number you want to extract results from',
					},
					{
						displayName: 'Pages',
						name: 'pages',
						type: 'number',
						default: 1,
						description:
							'Number of consecutive pages to fetch and combine (max 10; 3 or fewer recommended)',
					},
					{
						displayName: 'Radius',
						name: 'radius',
						type: 'string',
						default: '',
						description:
							'Radius in meters around latitude/longitude; only takes effect when both are supplied',
					},
					{
						displayName: 'Search Type',
						name: 'searchType',
						type: 'options',
						description: 'The type of search you want to perform',
						options: [
							{ name: 'Ads', value: 'ads' },
							{ name: 'AI Mode', value: 'ai_mode' },
							{ name: 'Classic', value: 'classic' },
							{ name: 'Images', value: 'images' },
							{ name: 'Lens', value: 'lens' },
							{ name: 'Maps', value: 'maps' },
							{ name: 'News', value: 'news' },
							{ name: 'Shopping', value: 'shopping' },
						],
						default: 'classic',
					},
					{
						displayName: 'Sort By',
						name: 'sortBy',
						type: 'options',
						description: 'Sort order for results; only applies to the shopping search type',
						options: [
							{ name: 'Price High To Low', value: 'price_desc' },
							{ name: 'Price Low To High', value: 'price_asc' },
							{ name: 'Relevance', value: 'relevance' },
							{ name: 'Reviews', value: 'reviews' },
						],
						// eslint-disable-next-line n8n-nodes-base/node-param-default-wrong-for-options
						default: '',
					},
					{
						displayName: 'Tag',
						name: 'tag',
						type: 'string',
						default: '',
						description:
							'Label returned in the response headers; does not affect scraping behavior',
					},
				],
			},
			// Additional Fields for Walmart Search API
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				default: {},
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						resource: ['walmartSearchAPI'],
					},
				},
				options: [
					{
						displayName: 'Add HTML',
						name: 'addHtml',
						type: 'boolean',
						default: false,
						description: 'Whether to add the full html of the page in the results or not',
					},
					{
						displayName: 'Delivery Zip',
						name: 'deliveryZip',
						type: 'string',
						default: '',
						description: 'ZIP code for delivery localization',
					},
					{
						displayName: 'Device',
						name: 'device',
						type: 'options',
						description: 'Control the device the request will be sent from',
						options: [
							{ name: 'Desktop', value: 'desktop' },
							{ name: 'Mobile', value: 'mobile' },
							{ name: 'Tablet', value: 'tablet' },
						],
						default: 'desktop',
					},
					{
						displayName: 'Domain',
						name: 'domain',
						type: 'string',
						default: '',
						description: 'Walmart domain for localization',
					},
					{
						displayName: 'Fulfillment Speed',
						name: 'fulfillmentSpeed',
						type: 'options',
						description: 'Delivery speed filter',
						options: [
							{ name: 'Today', value: 'today' },
							{ name: 'Tomorrow', value: 'tomorrow' },
							{ name: '2 Days', value: '2_days' },
							{ name: 'Anytime', value: 'anytime' },
						],
						// eslint-disable-next-line n8n-nodes-base/node-param-default-wrong-for-options
						default: '',
					},
					{
						displayName: 'Fulfillment Type',
						name: 'fulfillmentType',
						type: 'options',
						description: 'Fulfillment type filter',
						options: [{ name: 'In Store', value: 'in_store' }],
						// eslint-disable-next-line n8n-nodes-base/node-param-default-wrong-for-options
						default: '',
					},
					{
						displayName: 'Light Request',
						name: 'lightRequest',
						type: 'boolean',
						default: true,
						description:
							'Whether to use it without JavaScript-rendering or not. If false, forces JavaScript-rendered results.',
					},
					{
						displayName: 'Max Price',
						name: 'maxPrice',
						type: 'string',
						default: '',
						description: 'Maximum price filter',
					},
					{
						displayName: 'Min Price',
						name: 'minPrice',
						type: 'string',
						default: '',
						description: 'Minimum price filter',
					},
					{
						displayName: 'Screenshot',
						name: 'screenshot',
						type: 'boolean',
						default: false,
						description:
							'Whether to force a browser screenshot (returned base64-encoded, costs 15 credits, ignores Light Request) or not',
					},
					{
						displayName: 'Sort By',
						name: 'sortBy',
						type: 'options',
						description: 'Sorting options',
						options: [
							{ name: 'Best Match', value: 'best_match' },
							{ name: 'Price Low', value: 'price_low' },
							{ name: 'Price High', value: 'price_high' },
							{ name: 'Best Seller', value: 'best_seller' },
						],
						default: 'best_match',
					},
					{
						displayName: 'Start Page',
						name: 'startPage',
						type: 'number',
						default: 1,
						description: 'Page of the results to fetch',
					},
					{
						displayName: 'Store ID',
						name: 'storeId',
						type: 'string',
						default: '',
						description: 'Specific Walmart store ID for localization',
					},
					{
						displayName: 'Tag',
						name: 'tag',
						type: 'string',
						default: '',
						description:
							'Label returned in the response headers; does not affect scraping behavior',
					},
				],
			},
			// Additional Fields for Walmart Product API
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				default: {},
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						resource: ['walmartProductAPI'],
					},
				},
				options: [
					{
						displayName: 'Add HTML',
						name: 'addHtml',
						type: 'boolean',
						default: false,
						description: 'Whether to add the full html of the page in the results or not',
					},
					{
						displayName: 'Delivery Zip',
						name: 'deliveryZip',
						type: 'string',
						default: '',
						description: 'ZIP code for delivery localization',
					},
					{
						displayName: 'Device',
						name: 'device',
						type: 'options',
						description: 'Control the device the request will be sent from',
						options: [
							{ name: 'Desktop', value: 'desktop' },
							{ name: 'Mobile', value: 'mobile' },
							{ name: 'Tablet', value: 'tablet' },
						],
						default: 'desktop',
					},
					{
						displayName: 'Domain',
						name: 'domain',
						type: 'string',
						default: '',
						description: 'Walmart domain for localization',
					},
					{
						displayName: 'Light Request',
						name: 'lightRequest',
						type: 'boolean',
						default: true,
						description:
							'Whether to use it without JavaScript-rendering or not. If false, forces JavaScript-rendered results.',
					},
					{
						displayName: 'Screenshot',
						name: 'screenshot',
						type: 'boolean',
						default: false,
						description:
							'Whether to force a browser screenshot (returned base64-encoded, costs 15 credits, ignores Light Request) or not',
					},
					{
						displayName: 'Store ID',
						name: 'storeId',
						type: 'string',
						default: '',
						description: 'Specific Walmart store ID for localization',
					},
					{
						displayName: 'Tag',
						name: 'tag',
						type: 'string',
						default: '',
						description:
							'Label returned in the response headers; does not affect scraping behavior',
					},
				],
			},
			// Additional Fields for Amazon Search API
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				default: {},
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						resource: ['amazonSearchAPI'],
					},
				},
				options: [
					{
						displayName: 'Add HTML',
						name: 'addHtml',
						type: 'boolean',
						default: false,
						description: 'Whether to add the full html of the page in the results or not',
					},
					{
						displayName: 'Autoselect Variant',
						name: 'autoselectVariant',
						type: 'boolean',
						default: false,
						description:
							'Whether to automatically select the default/most popular product variant or not',
					},
					{
						displayName: 'Category ID',
						name: 'categoryId',
						type: 'string',
						default: '',
						description: 'Filter search results by category ID',
					},
					{
						displayName: 'Country',
						name: 'country',
						type: 'string',
						default: '',
						description: 'Country code for geolocation of the request',
					},
					{
						displayName: 'Currency',
						name: 'currency',
						type: 'string',
						default: '',
						description: 'Currency code (ISO 4217) to display results',
					},
					{
						displayName: 'Device',
						name: 'device',
						type: 'options',
						description: 'Control the device the request will be sent from',
						options: [
							{ name: 'Desktop', value: 'desktop' },
							// NOT WORKING IN API
							// { name: 'Mobile', value: 'mobile' },
							// { name: 'Tablet', value: 'tablet' },
						],
						default: 'desktop',
					},
					{
						displayName: 'Domain',
						name: 'domain',
						type: 'string',
						default: 'com',
						description: 'Top-level domain to use (e.g., com, co.uk, de)',
					},
					// NOT WORKING IN API
					// {
					// 	displayName: 'Language',
					// 	name: 'language',
					// 	type: 'string',
					// 	default: '',
					// 	description: 'Language code for the request (ISO format)',
					// },
					{
						displayName: 'Light Request',
						name: 'lightRequest',
						type: 'boolean',
						default: true,
						description:
							'Whether to use it without JavaScript-rendering or not. If false, forces JavaScript-rendered results.',
					},
					{
						displayName: 'Merchant ID',
						name: 'merchantId',
						type: 'string',
						default: '',
						description: 'Filter search results by merchant ID',
					},
					{
						displayName: 'Pages',
						name: 'pages',
						type: 'number',
						default: 1,
						description: 'Number of result pages to fetch',
					},
					{
						displayName: 'Screenshot',
						name: 'screenshot',
						type: 'boolean',
						default: false,
						description:
							'Whether to force a browser screenshot (returned base64-encoded, costs 15 credits, ignores Light Request) or not',
					},
					{
						displayName: 'Sort By',
						name: 'sortBy',
						type: 'options',
						description: 'Sorting method for the results',
						options: [
							{ name: 'Average Review', value: 'average_review' },
							{ name: 'Best Sellers', value: 'bestsellers' },
							{ name: 'Featured', value: 'featured' },
							{ name: 'Most Recent', value: 'most_recent' },
							{ name: 'Price High To Low', value: 'price_high_to_low' },
							{ name: 'Price Low To High', value: 'price_low_to_high' },
						],
						// eslint-disable-next-line n8n-nodes-base/node-param-default-wrong-for-options
						default: '',
					},
					{
						displayName: 'Start Page',
						name: 'startPage',
						type: 'number',
						default: 1,
						description: 'First page of the results to fetch',
					},
					{
						displayName: 'Tag',
						name: 'tag',
						type: 'string',
						default: '',
						description:
							'Label returned in the response headers; does not affect scraping behavior',
					},
					{
						displayName: 'Zip Code',
						name: 'zipCode',
						type: 'string',
						default: '',
						description: 'ZIP or postal code for geolocation',
					},
				],
			},
			// Additional Fields for Amazon Product API
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				default: {},
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						resource: ['amazonProductAPI'],
					},
				},
				options: [
					{
						displayName: 'Add HTML',
						name: 'addHtml',
						type: 'boolean',
						default: false,
						description: 'Whether to add the full html of the page in the results or not',
					},
					{
						displayName: 'Country',
						name: 'country',
						type: 'string',
						default: '',
						description: 'Country code for geolocation of the request',
					},
					{
						displayName: 'Currency',
						name: 'currency',
						type: 'string',
						default: '',
						description: 'Currency code (ISO 4217) to display results',
					},
					{
						displayName: 'Device',
						name: 'device',
						type: 'options',
						description: 'Control the device the request will be sent from',
						options: [
							{ name: 'Desktop', value: 'desktop' },
							// NOT WORKING IN API
							// { name: 'Mobile', value: 'mobile' },
							// { name: 'Tablet', value: 'tablet' },
						],
						default: 'desktop',
					},
					{
						displayName: 'Domain',
						name: 'domain',
						type: 'string',
						default: 'com',
						description: 'Top-level domain to use (e.g., com, co.uk, de)',
					},
					// NOT WORKING IN API
					// {
					// 	displayName: 'Language',
					// 	name: 'language',
					// 	type: 'string',
					// 	default: '',
					// 	description: 'Language code for the request (ISO format)',
					// },
					{
						displayName: 'Light Request',
						name: 'lightRequest',
						type: 'boolean',
						default: true,
						description:
							'Whether to use it without JavaScript-rendering or not. If false, forces JavaScript-rendered results.',
					},
					{
						displayName: 'Screenshot',
						name: 'screenshot',
						type: 'boolean',
						default: false,
						description:
							'Whether to force a browser screenshot (returned base64-encoded, costs 15 credits, ignores Light Request) or not',
					},
					{
						displayName: 'Tag',
						name: 'tag',
						type: 'string',
						default: '',
						description:
							'Label returned in the response headers; does not affect scraping behavior',
					},
					{
						displayName: 'Zip Code',
						name: 'zipCode',
						type: 'string',
						default: '',
						description: 'ZIP or postal code for geolocation',
					},
				],
			},
			// Additional Fields for Amazon Pricing API
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				default: {},
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						resource: ['amazonPricingAPI'],
					},
				},
				options: [
					{
						displayName: 'Add HTML',
						name: 'addHtml',
						type: 'boolean',
						default: false,
						description: 'Whether to add the full html of the page in the results or not',
					},
					{
						displayName: 'Country',
						name: 'country',
						type: 'string',
						default: '',
						description:
							'Country code for geolocation of the request. Must not match the domain\'s own country; use Zip Code instead in that case.',
					},
					{
						displayName: 'Currency',
						name: 'currency',
						type: 'string',
						default: '',
						description: 'Currency code (ISO 4217) to display results',
					},
					{
						displayName: 'Device',
						name: 'device',
						type: 'options',
						description: 'Control the device the request will be sent from',
						options: [{ name: 'Desktop', value: 'desktop' }],
						default: 'desktop',
					},
					{
						displayName: 'Domain',
						name: 'domain',
						type: 'string',
						default: 'com',
						description: 'Top-level domain to use (e.g., com, co.uk, de)',
					},
					{
						displayName: 'Language',
						name: 'language',
						type: 'string',
						default: '',
						description: 'Language code for the request (ISO format)',
					},
					{
						displayName: 'Light Request',
						name: 'lightRequest',
						type: 'boolean',
						default: true,
						description:
							'Whether to use it without JavaScript-rendering or not. If false, forces JavaScript-rendered results.',
					},
					{
						displayName: 'Tag',
						name: 'tag',
						type: 'string',
						default: '',
						description:
							'Label returned in the response headers; does not affect scraping behavior',
					},
					{
						displayName: 'Zip Code',
						name: 'zipCode',
						type: 'string',
						default: '',
						description: 'ZIP or postal code for geolocation',
					},
				],
			},
			// Additional Fields for ChatGPT API
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				default: {},
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						resource: ['chatgptAPI'],
					},
				},
				options: [
					{
						displayName: 'Add HTML',
						name: 'addHtml',
						type: 'boolean',
						default: false,
						description: 'Whether to add the full html of the page in the results or not',
					},
					{
						displayName: 'Country Code',
						name: 'countryCode',
						type: 'string',
						default: '',
						description: 'Country code from which you would like the request to come from',
					},
					{
						displayName: 'Search',
						name: 'search',
						type: 'boolean',
						default: false,
						description: 'Whether to enable web search to enhance the GPT response or not',
					},
					{
						displayName: 'Tag',
						name: 'tag',
						type: 'string',
						default: '',
						description:
							'Label returned in the response headers; does not affect scraping behavior',
					},
				],
			},
			// Additional Fields for Gemini API
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				default: {},
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						resource: ['geminiAPI'],
					},
				},
				options: [
					{
						displayName: 'Add HTML',
						name: 'addHtml',
						type: 'boolean',
						default: false,
						description: 'Whether to add the full html of the page in the results or not',
					},
					{
						displayName: 'Country Code',
						name: 'countryCode',
						type: 'string',
						default: '',
						description: 'Country code from which you would like the request to come from',
					},
					{
						displayName: 'Tag',
						name: 'tag',
						type: 'string',
						default: '',
						description:
							'Label returned in the response headers; does not affect scraping behavior',
					},
				],
			},
			// Additional Fields for Fast Search API
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				default: {},
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						resource: ['fastSearchAPI'],
					},
				},
				options: [
					{
						displayName: 'Country Code',
						name: 'countryCode',
						type: 'string',
						default: 'us',
						description: 'Country code used to localize the search results (ISO 3166-1 alpha-2)',
					},
					{
						displayName: 'Language',
						name: 'language',
						type: 'string',
						default: 'en',
						description: 'Language the search results will be displayed in',
					},
					{
						displayName: 'Page',
						name: 'page',
						type: 'number',
						default: 1,
						description: 'The page number you want to extract results from',
					},
					{
						displayName: 'Tag',
						name: 'tag',
						type: 'string',
						default: '',
						description:
							'Label returned in the response headers; does not affect scraping behavior',
					},
				],
			},
			// Additional Fields for YouTube Search API
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				default: {},
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						resource: ['youtubeSearchAPI'],
					},
				},
				options: [
					{
						displayName: '360° Videos',
						name: '360',
						type: 'boolean',
						default: false,
						description: 'Whether to return only 360-degree videos or not',
					},
					{
						displayName: '3D Videos',
						name: '3d',
						type: 'boolean',
						default: false,
						description: 'Whether to return only 3D videos or not',
					},
					{
						displayName: '4K Filter',
						name: '4k',
						type: 'boolean',
						default: false,
						description: 'Whether to return only 4K videos or not',
					},
					{
						displayName: 'Creative Commons',
						name: 'creativeCommons',
						type: 'boolean',
						default: false,
						description: 'Whether to return only videos with Creative Commons license or not',
					},
					{
						displayName: 'Duration Filter',
						name: 'duration',
						type: 'options',
						description: 'Filter by video duration (minutes)',
						options: [
							{ name: 'Any Duration', value: '' },
							{ name: '< 4 Minutes', value: '<4' },
							{ name: '4-20 Minutes', value: '4-20' },
							{ name: '> 20 Minutes', value: '>20' },
						],
						default: '',
					},
					{
						displayName: 'HD Filter',
						name: 'hd',
						type: 'boolean',
						default: false,
						description: 'Whether to return only HD videos or not',
					},
					{
						displayName: 'HDR Videos',
						name: 'hdr',
						type: 'boolean',
						default: false,
						description: 'Whether to return only HDR videos or not',
					},
					{
						displayName: 'Live Streams',
						name: 'live',
						type: 'boolean',
						default: false,
						description: 'Whether to return only live streams or not',
					},
					{
						displayName: 'Location Filter',
						name: 'location',
						type: 'boolean',
						default: false,
						description: 'Whether to return only videos with location metadata or not',
					},
					// NOT WORKING IN API
					// {
					// 	displayName: 'Purchased',
					// 	name: 'purchased',
					// 	type: 'boolean',
					// 	default: false,
					// 	description: 'Whether to return only purchased content or not',
					// },
					{
						displayName: 'Result Type',
						name: 'type',
						type: 'options',
						description: 'Result type to return',
						options: [
							{ name: 'All Types', value: '' },
							{ name: 'Channel', value: 'channel' },
							{ name: 'Movie', value: 'movie' },
							{ name: 'Playlist', value: 'playlist' },
							{ name: 'Video', value: 'video' },
						],
						default: '',
					},
					{
						displayName: 'Sort By',
						name: 'sort_by',
						type: 'options',
						description: 'Sorting method for results',
						options: [
							{ name: 'Rating', value: 'rating' },
							{ name: 'Relevance', value: 'relevance' },
							{ name: 'View Count', value: 'view_count' },
							{ name: 'Upload Date', value: 'upload_date' },
						],
						default: 'relevance',
					},
					{
						displayName: 'Subtitles Filter',
						name: 'subtitles',
						type: 'boolean',
						default: false,
						description: 'Whether to return only videos with subtitles/closed captions or not',
					},
					{
						displayName: 'Tag',
						name: 'tag',
						type: 'string',
						default: '',
						description:
							'Label returned in the response headers; does not affect scraping behavior',
					},
					{
						displayName: 'Upload Date',
						name: 'upload_date',
						type: 'options',
						description: 'Filter resulting by upload date',
						options: [
							{ name: 'Any Date', value: '' },
							{ name: 'Last Hour', value: 'last_hour' },
							{ name: 'This Month', value: 'this_month' },
							{ name: 'This Week', value: 'this_week' },
							{ name: 'This Year', value: 'this_year' },
							{ name: 'Today', value: 'today' },
						],
						default: '',
					},
					{
						displayName: 'VR180 Videos',
						name: 'vr180',
						type: 'boolean',
						default: false,
						description: 'Whether to return only VR180 videos or not',
					},
				],
			},
			// Additional Fields for YouTube Metadata API
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				default: {},
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						resource: ['youtubeMetadataAPI'],
					},
				},
				options: [
					{
						displayName: 'Tag',
						name: 'tag',
						type: 'string',
						default: '',
						description:
							'Label returned in the response headers; does not affect scraping behavior',
					},
				],
			},
			// Additional Fields for YouTube Subtitles API
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				default: {},
				placeholder: 'Add Field',
				displayOptions: {
					show: {
						resource: ['youtubeSubtitlesAPI'],
					},
				},
				options: [
					{
						displayName: 'Language',
						name: 'language',
						type: 'string',
						default: 'en',
						description: 'Subtitle language (ISO code)',
					},
					{
						displayName: 'Subtitle Origin',
						name: 'subtitle_origin',
						type: 'options',
						description: 'Choose auto-generated or uploader-provided subtitles',
						options: [
							{ name: 'Auto Generated', value: 'auto_generated' },
							{ name: 'Uploader Provided', value: 'uploader_provided' },
						],
						default: 'auto_generated',
					},
					{
						displayName: 'Tag',
						name: 'tag',
						type: 'string',
						default: '',
						description:
							'Label returned in the response headers; does not affect scraping behavior',
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;

				const headers: { [key: string]: string } = { 'User-Agent': 'n8n' };
				let endpoint = '';
				let requestMethod: 'GET' | 'POST' | 'PUT' = 'GET';

				const requestOptions: IHttpRequestOptions = {
					url: '',
					method: 'GET',
					headers,
					returnFullResponse: true,
					encoding: 'arraybuffer', // Always expect a buffer for any content type
					json: false, // We will handle the body manually
				};

				// All parameters for the ScrapingBee URL will be built here
				const scrapingBeeUrlParams: { [key: string]: any } = {};

				if (resource === 'htmlAPI') {
					endpoint = 'https://app.scrapingbee.com/api/v1/';
					requestMethod = (this.getNodeParameter('operation', i) as string).toUpperCase() as
						| 'GET'
						| 'POST'
						| 'PUT';

					// Add base URL parameter
					scrapingBeeUrlParams.url = this.getNodeParameter('url', i) as string;

					// Add all Additional Fields (like 'screenshot') to the URL parameters
					const additionalFields = this.getNodeParameter('additionalFields', i, {}) as any;
					Object.keys(additionalFields).forEach((key) => {
						const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
						if (
							additionalFields[key] !== '' &&
							additionalFields[key] !== undefined &&
							additionalFields[key] !== null
						) {
							scrapingBeeUrlParams[snakeKey] = additionalFields[key];
						}
					});

					const forwardHeaders = this.getNodeParameter('forwardHeaders', i, false) as boolean;
					if (forwardHeaders) {
						scrapingBeeUrlParams.forward_headers = true;
						const specifyHeaders = this.getNodeParameter('specifyHeaders', i, 'keypair') as string;
						if (specifyHeaders === 'json') {
							const jsonHeaders = this.getNodeParameter('jsonHeadersParameter', i, '') as string;
							if (jsonHeaders) Object.assign(headers, JSON.parse(jsonHeaders));
						} else {
							const headerParameters = this.getNodeParameter('headerParameters', i, {
								header: [],
							}) as { header: { name: string; value: string }[] };
							for (const header of headerParameters.header) {
								headers[`Spb-${header.name}`] = header.value;
							}
						}
					}

					requestOptions.method = requestMethod;

					if (requestMethod === 'POST' || requestMethod === 'PUT') {
						const sendBody = this.getNodeParameter('sendBody', i, false) as boolean;
						if (sendBody) {
							scrapingBeeUrlParams.forward_headers = true;
							let forwardedBody: string | Buffer = '';
							const bodyContentType = this.getNodeParameter(
								'bodyContentType',
								i,
								'formUrlencoded',
							) as string;

							if (bodyContentType === 'formUrlencoded') {
								const bodyParameters = this.getNodeParameter('bodyParameters', i, {
									parameter: [],
								}) as { parameter: { name: string; value: string }[] };
								const urlSearchParams = new URLSearchParams();
								for (const param of bodyParameters.parameter) {
									urlSearchParams.append(param.name, param.value);
								}
								forwardedBody = urlSearchParams.toString();
								headers['Spb-Content-Type'] = 'application/x-www-form-urlencoded';
							} else if (bodyContentType === 'json') {
								forwardedBody = this.getNodeParameter('jsonBodyParameter', i, '') as string;
								headers['Spb-Content-Type'] = 'application/json';
							} else if (bodyContentType === 'raw') {
								forwardedBody = this.getNodeParameter('rawBodyParameter', i, '') as string;
								headers['Spb-Content-Type'] = this.getNodeParameter(
									'rawContentType',
									i,
									'text/plain',
								) as string;
							}

							// The body of the request to ScrapingBee is the exact body for the target
							requestOptions.body = forwardedBody;
						}
					}
				} else if (resource === 'googleSearchAPI') {
					endpoint = 'https://app.scrapingbee.com/api/v1/store/google';
					requestOptions.method = 'GET';
					scrapingBeeUrlParams.search = this.getNodeParameter('search', i) as string;
					const additionalFields = this.getNodeParameter('additionalFields', i, {}) as any;
					Object.keys(additionalFields).forEach((key) => {
						const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
						if (
							additionalFields[key] !== '' &&
							additionalFields[key] !== undefined &&
							additionalFields[key] !== null
						) {
							scrapingBeeUrlParams[snakeKey] = additionalFields[key];
						}
					});
				} else if (resource === 'fastSearchAPI') {
					endpoint = 'https://app.scrapingbee.com/api/v1/fast_search';
					requestOptions.method = 'GET';
					scrapingBeeUrlParams.search = this.getNodeParameter('search', i) as string;
					const additionalFields = this.getNodeParameter('additionalFields', i, {}) as any;
					Object.keys(additionalFields).forEach((key) => {
						const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
						if (
							additionalFields[key] !== '' &&
							additionalFields[key] !== undefined &&
							additionalFields[key] !== null
						) {
							scrapingBeeUrlParams[snakeKey] = additionalFields[key];
						}
					});
				} else if (resource === 'walmartSearchAPI') {
					endpoint = 'https://app.scrapingbee.com/api/v1/walmart/search';
					requestOptions.method = 'GET';
					scrapingBeeUrlParams.query = this.getNodeParameter('query', i) as string;
					const additionalFields = this.getNodeParameter('additionalFields', i, {}) as any;
					Object.keys(additionalFields).forEach((key) => {
						const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
						if (
							additionalFields[key] !== '' &&
							additionalFields[key] !== undefined &&
							additionalFields[key] !== null
						) {
							scrapingBeeUrlParams[snakeKey] = additionalFields[key];
						}
					});
				} else if (resource === 'walmartProductAPI') {
					endpoint = 'https://app.scrapingbee.com/api/v1/walmart/product';
					requestOptions.method = 'GET';
					scrapingBeeUrlParams.product_id = this.getNodeParameter('productId', i) as string;
					const additionalFields = this.getNodeParameter('additionalFields', i, {}) as any;
					Object.keys(additionalFields).forEach((key) => {
						const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
						if (
							additionalFields[key] !== '' &&
							additionalFields[key] !== undefined &&
							additionalFields[key] !== null
						) {
							scrapingBeeUrlParams[snakeKey] = additionalFields[key];
						}
					});
				} else if (resource === 'amazonSearchAPI') {
					endpoint = 'https://app.scrapingbee.com/api/v1/amazon/search';
					requestOptions.method = 'GET';
					scrapingBeeUrlParams.query = this.getNodeParameter('query', i) as string;
					const additionalFields = this.getNodeParameter('additionalFields', i, {}) as any;
					Object.keys(additionalFields).forEach((key) => {
						const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
						if (
							additionalFields[key] !== '' &&
							additionalFields[key] !== undefined &&
							additionalFields[key] !== null
						) {
							scrapingBeeUrlParams[snakeKey] = additionalFields[key];
						}
					});
				} else if (resource === 'amazonProductAPI') {
					endpoint = 'https://app.scrapingbee.com/api/v1/amazon/product';
					requestOptions.method = 'GET';
					scrapingBeeUrlParams.query = this.getNodeParameter('query', i) as string;
					const additionalFields = this.getNodeParameter('additionalFields', i, {}) as any;
					Object.keys(additionalFields).forEach((key) => {
						const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
						if (
							additionalFields[key] !== '' &&
							additionalFields[key] !== undefined &&
							additionalFields[key] !== null
						) {
							scrapingBeeUrlParams[snakeKey] = additionalFields[key];
						}
					});
				} else if (resource === 'amazonPricingAPI') {
					endpoint = 'https://app.scrapingbee.com/api/v1/amazon/pricing';
					requestOptions.method = 'GET';
					scrapingBeeUrlParams.asin = this.getNodeParameter('asin', i) as string;
					const additionalFields = this.getNodeParameter('additionalFields', i, {}) as any;
					Object.keys(additionalFields).forEach((key) => {
						const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
						if (
							additionalFields[key] !== '' &&
							additionalFields[key] !== undefined &&
							additionalFields[key] !== null
						) {
							scrapingBeeUrlParams[snakeKey] = additionalFields[key];
						}
					});
				} else if (resource === 'chatgptAPI') {
					endpoint = 'https://app.scrapingbee.com/api/v1/chatgpt';
					requestOptions.method = 'GET';
					scrapingBeeUrlParams.prompt = this.getNodeParameter('prompt', i) as string;
					const additionalFields = this.getNodeParameter('additionalFields', i, {}) as any;
					Object.keys(additionalFields).forEach((key) => {
						const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
						if (
							additionalFields[key] !== '' &&
							additionalFields[key] !== undefined &&
							additionalFields[key] !== null
						) {
							scrapingBeeUrlParams[snakeKey] = additionalFields[key];
						}
					});
				} else if (resource === 'geminiAPI') {
					endpoint = 'https://app.scrapingbee.com/api/v1/gemini';
					requestOptions.method = 'GET';
					scrapingBeeUrlParams.prompt = this.getNodeParameter('prompt', i) as string;
					const additionalFields = this.getNodeParameter('additionalFields', i, {}) as any;
					Object.keys(additionalFields).forEach((key) => {
						const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
						if (
							additionalFields[key] !== '' &&
							additionalFields[key] !== undefined &&
							additionalFields[key] !== null
						) {
							scrapingBeeUrlParams[snakeKey] = additionalFields[key];
						}
					});
				} else if (resource === 'youtubeMetadataAPI') {
					endpoint = 'https://app.scrapingbee.com/api/v1/youtube/metadata';
					requestOptions.method = 'GET';
					scrapingBeeUrlParams.video_id = this.getNodeParameter('videoId', i) as string;
					const additionalFields = this.getNodeParameter('additionalFields', i, {}) as any;
					Object.keys(additionalFields).forEach((key) => {
						const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
						if (
							additionalFields[key] !== '' &&
							additionalFields[key] !== undefined &&
							additionalFields[key] !== null
						) {
							scrapingBeeUrlParams[snakeKey] = additionalFields[key];
						}
					});
				} else if (resource === 'youtubeSearchAPI') {
					endpoint = 'https://app.scrapingbee.com/api/v1/youtube/search';
					requestOptions.method = 'GET';
					scrapingBeeUrlParams.search = this.getNodeParameter('search', i) as string;
					const additionalFields = this.getNodeParameter('additionalFields', i, {}) as any;
					Object.keys(additionalFields).forEach((key) => {
						const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
						if (
							additionalFields[key] !== '' &&
							additionalFields[key] !== undefined &&
							additionalFields[key] !== null
						) {
							scrapingBeeUrlParams[snakeKey] = additionalFields[key];
						}
					});
				} else if (resource === 'youtubeSubtitlesAPI') {
					endpoint = 'https://app.scrapingbee.com/api/v1/youtube/subtitles';
					requestOptions.method = 'GET';
					scrapingBeeUrlParams.video_id = this.getNodeParameter('videoId', i) as string;
					const additionalFields = this.getNodeParameter('additionalFields', i, {}) as any;
					Object.keys(additionalFields).forEach((key) => {
						const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
						if (
							additionalFields[key] !== '' &&
							additionalFields[key] !== undefined &&
							additionalFields[key] !== null
						) {
							scrapingBeeUrlParams[snakeKey] = additionalFields[key];
						}
					});
				} else if (resource === 'usage') {
					endpoint = 'https://app.scrapingbee.com/api/v1/usage';
					requestOptions.method = 'GET';
				} else {
					throw new NodeOperationError(
						this.getNode(),
						`The resource "${resource}" is not supported. It may have been renamed or removed in this version of the node; please reconfigure the node.`,
						{ itemIndex: i },
					);
				}

				// Assign all collected URL parameters and the final URL to the request options
				requestOptions.url = endpoint;
				requestOptions.qs = scrapingBeeUrlParams;

				const response = await this.helpers.httpRequestWithAuthentication.call(
					this,
					'ScrapingBeeApi',
					requestOptions,
				);
				const contentType = (response.headers['content-type'] || '').split(';')[0];
				const responseBody = Buffer.from(response.body);

				if (contentType.includes('application/json')) {
					try {
						const jsonData = JSON.parse(responseBody.toString());
						returnData.push({ json: jsonData, pairedItem: { item: i } });
					} catch (parseError) {
						returnData.push({ json: { raw: responseBody.toString() }, pairedItem: { item: i } });
					}
				} else if (contentType.startsWith('text/')) {
					returnData.push({ json: { data: responseBody.toString() }, pairedItem: { item: i } });
				} else {
					const contentDisposition = response.headers['content-disposition'];
					let fileName = '';
					let directory = '';

					if (contentDisposition) {
						const match = contentDisposition.match(/filename="?([^"]+)"?/);
						if (match) {
							fileName = match[1];
						}
					}

					if (!fileName && requestOptions.qs?.url) {
						try {
							const url = new URL(requestOptions.qs.url as string);
							const pathParts = url.pathname.split('/').filter((p) => p);
							fileName = pathParts.pop() || '';
							directory = pathParts.join('/');
						} catch (e) {
							/* ignore invalid URLs */
						}
					}

					if (!fileName) {
						const extension = (contentType.split('/')[1] || 'bin').split('+')[0];
						fileName = `scrapingbee-data-${Date.now()}.${extension}`;
					}

					const binaryData = await this.helpers.prepareBinaryData(
						responseBody,
						fileName,
						contentType,
					);

					returnData.push({
						json: { directory },
						binary: { data: binaryData },
						pairedItem: { item: i },
					});
				}
			} catch (error) {
				if (this.continueOnFail()) {
					let errorMessage = error.message;
					if (error.response?.body) {
						try {
							const apiError = JSON.parse(error.response.body.toString());
							errorMessage = apiError.message || apiError.detail || JSON.stringify(apiError);
						} catch (e) {
							errorMessage = error.response.body.toString();
						}
					}
					returnData.push({ json: { error: errorMessage }, pairedItem: { item: i } });
					continue;
				}
				throw new NodeOperationError(this.getNode(), error);
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
