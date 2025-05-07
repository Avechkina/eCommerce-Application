import { apiRoot } from '@services/BuildClient';
import { CustomerDraft } from 'types/registration';

const createCustomer = (customer: CustomerDraft) => {
  return apiRoot
    .me()
    .signup()
    .post({
      // The CustomerDraft is the object within the body
      body: customer,
    })
    .execute();
};

export default createCustomer;
