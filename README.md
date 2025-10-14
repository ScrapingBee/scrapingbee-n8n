# n8n-nodes-scrapingbee

This is an n8n community node. It lets you use ScrapingBee API in your n8n workflows.

The ScrapingBee web scraping API handles headless browsers, rotates proxies for you, and offers AI-powered data extraction.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)  <!-- delete if no auth needed -->
[Compatibility](#compatibility)
[Resources](#resources)
[Version history](#version-history)  <!-- delete if not using this section -->

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

- HTML API: GET, POST, PUT
- Google Search API: GET
- Usage: GET

## Credentials

You can obtain your API KEY for free by signing up and visting this page: https://app.scrapingbee.com/account/manage/api_key

When you signup, you will also get 1000 credits for free.

## Compatibility

n8n 1.101.2 and above

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [HTML API](https://www.scrapingbee.com/documentation/)
* [Google Search API](https://www.scrapingbee.com/documentation/google/)
* [Amazon Search API](https://www.scrapingbee.com/documentation/amazon/#amazon-search-api)
* [Amazon Product API](https://www.scrapingbee.com/documentation/amazon/#amazon-product-api)
* [Walmart Search API](https://www.scrapingbee.com/documentation/walmart/#walmart-search-api)
* [Walmart Product API](https://www.scrapingbee.com/documentation/walmart/#walmart-product-api)
* [ChatGPT API](https://www.scrapingbee.com/documentation/chatgpt/)
* [Usage](https://www.scrapingbee.com/documentation/#usage-endpoint)
* [Data Extraction](https://www.scrapingbee.com/documentation/data-extraction/)
* [JavaScript Scenario](https://www.scrapingbee.com/documentation/js-scenario/)

## Version history

- 0.1.5: Added support for Amazon, Walmart, and ChatGPT APIs, and configured it to be used as a tool for AI Agent
- 0.1.4: Added option to send body in POST and PUT requests, replaced deprecated interface and method, set n8n as user-agent and other minor changes
- 0.1.3: Added a credentials test
- 0.1.2: Fixed credentials file link
- 0.1.1: Minor bug fix
- 0.1.0: Initial Release
