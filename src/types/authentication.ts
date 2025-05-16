import { FormValues } from './registration';

export type LoginFormValues = Pick<FormValues, 'email' | 'password'>;
export type UserLogin = {
  email: string;
  password: string;
};
