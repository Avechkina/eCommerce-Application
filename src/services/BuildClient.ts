import { ClientBuilder, type Client } from '@commercetools/ts-client';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { tokenStore } from '@utils/tokenStore';

const {
  VITE_CTP_PROJECT_KEY: PROJECT_KEY,
  VITE_CTP_CLIENT_ID,
  VITE_CTP_CLIENT_SECRET,
  VITE_CTP_AUTH_URL: OAUTH_URI,
  VITE_CTP_API_URL: BASE_URI,
  //VITE_CTP_SCOPES: scope,
} = import.meta.env;

const CREDENTIALS = {
  clientId: VITE_CTP_CLIENT_ID,
  clientSecret: VITE_CTP_CLIENT_SECRET,
};

export const getAnonymClient = (): Client => {
  return new ClientBuilder()
    .withProjectKey(PROJECT_KEY)
    .withAnonymousSessionFlow({
      host: OAUTH_URI,
      projectKey: PROJECT_KEY,
      credentials: CREDENTIALS,
    })
    .withHttpMiddleware({ host: BASE_URI })
    .build();
};

export const getAuthClient = (username: string, password: string): Client => {
  return new ClientBuilder()
    .withProjectKey(PROJECT_KEY)
    .withPasswordFlow({
      host: OAUTH_URI,
      projectKey: PROJECT_KEY,
      credentials: { ...CREDENTIALS, user: { username, password } },
      tokenCache: tokenStore,
    })
    .withHttpMiddleware({ host: BASE_URI })
    .build();
};

export const getTokenClient = (refreshToken: string): Client => {
  return new ClientBuilder()
    .withProjectKey(PROJECT_KEY)
    .withRefreshTokenFlow({
      host: OAUTH_URI,
      projectKey: PROJECT_KEY,
      credentials: CREDENTIALS,
      refreshToken,
      tokenCache: tokenStore,
    })
    .withHttpMiddleware({ host: BASE_URI })
    .build();
};

export const getApiRoot = (client: Client) => {
  return createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: PROJECT_KEY,
  });
};

const client = getAnonymClient();
export const apiRoot = getApiRoot(client);
