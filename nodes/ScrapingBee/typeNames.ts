// The node and credential type names this package has published since 0.1.0. Users' saved
// workflows store the node type as `n8n-nodes-scrapingbee.ScrapingBee` and their saved
// credentials store the type `ScrapingBeeApi`; n8n resolves both by exact name and has no
// alias or migration mechanism, so changing either value would break every existing
// workflow and credential. They predate n8n's camelCase naming rules and must never change.
export const NODE_TYPE_NAME = 'ScrapingBee';
export const CREDENTIAL_TYPE_NAME = 'ScrapingBeeApi';
