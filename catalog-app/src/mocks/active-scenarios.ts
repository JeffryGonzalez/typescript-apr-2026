/**
 * Active scenario selection for MSW handlers.
 * This file is written by msw-lens — do not edit manually.
 * Keys are "METHOD endpoint", values are scenario names defined in the handler.
 */
const activeScenarios: Record<string, string> = {
  'GET /api/catalog': 'server-error',
  'POST /api/catalog': 'validation-error',
  'GET https://some-api.someserver.com': 'malformed-data',
};

export default activeScenarios;
