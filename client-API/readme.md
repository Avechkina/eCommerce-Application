# 📌 Client API Setup  

This Client API setup is based on the **Mobile & SPA template** from commercetools developer settings.  

All potentially useful files for the project are present in this folder.  

## 📂 Folder Contents  

- **reacteam-ecommerce-app.postman_environment** – used for API requests and data fetching.  
- **reacteam-ecommerce-app_React_API_client_v1** – used to set up environment variables. If chosen, it should be moved to the root directory and renamed to `.env`.  
- **reacteam-ecommerce-app_curl** – contains `curl` requests for interacting with the project's API. It is used to obtain an OAuth token and perform other API requests.  
- **reacteam-ecommerce-app** – initializes the commercetools API client. It automatically requests OAuth tokens and processes API requests. If this method is chosen, the following plugins must be installed:  
  ✔ `@commercetools/sdk-client` – API request client.  
  ✔ `@commercetools/sdk-middleware-auth` – OAuth authentication middleware.  
  ✔ `@commercetools/sdk-middleware-http` – HTTP request processing middleware.  

## 🔌 Required Plugins  

The following plugins are required for proper functionality:  
✔ `@commercetools/sdk-client` – API request client.  
✔ `@commercetools/sdk-middleware-auth` – OAuth authentication middleware.  
✔ `@commercetools/sdk-middleware-http` – HTTP request processing middleware.  

## 🔹 Example curl requests  

Here are useful `curl` requests for interacting with the commercetools API:  

✔ **Get OAuth token:**  
```bash
curl https://auth.eu-central-1.aws.commercetools.com/oauth/token \
     --basic --user "CLIENT_ID:CLIENT_SECRET" \
     -X POST \
     -d "grant_type=client_credentials&scope=manage_my_shopping_lists:reacteam-ecommerce-app ..."