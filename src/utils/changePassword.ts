import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';

const changePassword = (
  apiRoot: ByProjectKeyRequestBuilder,
  version: number,
  currentPassword: string,
  newPassword: string
) => {
  return apiRoot
    .me()
    .password()
    .post({ body: { version, currentPassword, newPassword } })
    .execute();
};

export default changePassword;
