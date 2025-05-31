import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';
import { LoginFormValues } from 'types/authentication';

const loginCustomer = (
  apiRoot: ByProjectKeyRequestBuilder,
  customer: LoginFormValues
) => {
  return apiRoot
    .me()
    .login()
    .post({
      // The LoginFormValues is the object within the body
      body: customer,
    })
    .execute();
};

export default loginCustomer;
