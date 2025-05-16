import { apiRoot } from '@services/BuildClient';
import { UserLogin } from 'types/authentication';

const loginCustomer = (customer: UserLogin) => {
  return apiRoot
    .me()
    .login()
    .post({
      // The UserLogin is the object within the body
      body: customer,
    })
    .execute();
};

export default loginCustomer;
