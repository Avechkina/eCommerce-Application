import { createClient } from '@commercetools/sdk-client';
import { createAuthMiddlewareForClientCredentialsFlow } from '@commercetools/sdk-middleware-auth';
import { createHttpMiddleware } from '@commercetools/sdk-middleware-http';

const projectKey = 'reacteam-ecommerce-app';

const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
  host: 'https://auth.eu-central-1.aws.commercetools.com',
  projectKey,
  credentials: {
    clientId: '5tMfcVS4JDjNSvJGud1hQ2EK',
    clientSecret: 'E1jh5tiRoct4IwevjXtJFLnPG1AKnDdN',
  },
  scopes: [
    'manage_my_shopping_lists:reacteam-ecommerce-app view_categories:reacteam-ecommerce-app manage_my_quote_requests:reacteam-ecommerce-app manage_my_profile:reacteam-ecommerce-app manage_my_quotes:reacteam-ecommerce-app create_anonymous_token:reacteam-ecommerce-app view_published_products:reacteam-ecommerce-app manage_my_business_units:reacteam-ecommerce-app manage_my_orders:reacteam-ecommerce-app manage_my_payments:reacteam-ecommerce-app',
  ],
});
const httpMiddleware = createHttpMiddleware({
  host: 'https://api.eu-central-1.aws.commercetools.com',
});
const client = createClient({
  middlewares: [authMiddleware, httpMiddleware],
});
