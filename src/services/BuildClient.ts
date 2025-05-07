import { ClientBuilder, type Client } from '@commercetools/ts-client';
import {
  createApiBuilderFromCtpClient,
  ApiRoot,
} from '@commercetools/platform-sdk';

const {
  VITE_CTP_PROJECT_KEY: key,
  VITE_CTP_CLIENT_ID: id,
  VITE_CTP_CLIENT_SECRET: secret,
  VITE_CTP_AUTH_URL: authUrl,
  VITE_CTP_API_URL: apiUrl,
  //VITE_CTP_SCOPES: scope,
} = import.meta.env;

const BASE_URI = apiUrl;
const OAUTH_URI = authUrl;
const PROJECT_KEY = key;
const CREDENTIALS = {
  clientId: id,
  clientSecret: secret,
};

const getClient = (): Client => {
  return new ClientBuilder()
    .defaultClient(BASE_URI, CREDENTIALS, OAUTH_URI, PROJECT_KEY)
    .build();
};

const getApiRoot = (client: Client): ApiRoot => {
  return createApiBuilderFromCtpClient(client);
};

const client = getClient();
export const apiRoot = getApiRoot(client).withProjectKey({ projectKey: key });
