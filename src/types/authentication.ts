import { FormValues } from './registration';

export type LoginFormValues = Pick<FormValues, 'email' | 'password'>;
