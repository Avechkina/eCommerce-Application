import { apiRoot } from '@services/BuildClient';
import { LoginFormValues } from 'types/authentication';

const loginCustomer = (customer: LoginFormValues) => {
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
