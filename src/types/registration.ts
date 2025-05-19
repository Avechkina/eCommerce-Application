import dayjs from 'dayjs';

export type CustomerDraft = {
  key?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses?: Address[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
};

export type Address = {
  country: string;
  city: string;
  postalCode: string;
  streetName: string;
};

export type RegistrationFormFields = CustomerDraft &
  Address & {
    dateOfBirth: dayjs.Dayjs;
  };

export type FormValues = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  password: string;
  country: string;
  city: string;
  postalCode: string;
  streetName: string;
  billingCountry: string;
  billingCity: string;
  billingPostalCode: string;
  billingStreetName: string;
};
