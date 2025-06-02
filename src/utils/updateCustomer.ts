import {
  ByProjectKeyRequestBuilder,
  MyCustomerUpdateAction,
} from '@commercetools/platform-sdk';

const updateCustomer = (
  apiRoot: ByProjectKeyRequestBuilder,
  version: number,
  actions: MyCustomerUpdateAction[]
) => {
  return apiRoot.me().post({ body: { version, actions } }).execute();
};

export default updateCustomer;
