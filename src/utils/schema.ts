import * as yup from 'yup';
import dayjs from 'dayjs';
import { COUNTRIES } from '@utils/constants';

const VALIDATION_RULES = {
  PASSWORD_LENGTH: 8,
  MINIMUM_AGE: 13,
};

const countrySchema = yup
  .string()
  .required('Please select your country')
  .test(
    'no-leading-space',
    'Value must not contain leading or trailing whitespace',
    (value) => !value || value.trim() === value
  )
  .test(
    'is valid country',
    'Select a valid country',
    (value) => !!value && COUNTRIES.some((c) => c.value === value)
  );
const citySchema = yup
  .string()
  .required('Please input your city name')
  .test(
    'no-leading-space',
    'Value must not contain leading or trailing whitespace',
    (value) => !value || value.trim() === value
  )
  .matches(/^[A-Za-z]+$/, 'City name must contain only letters');

const postalCodeSchema = yup
  .string()
  .required('Please input your postal code')
  .test(
    'no-leading-space',
    'Value must not contain leading or trailing whitespace',
    (value) => !value || value.trim() === value
  )
  .when('country', {
    is: 'Georgia',
    then: (schema) =>
      schema.matches(/^\d{4}$/, 'Value must be exactly 4 digits'),
  })
  .when('country', {
    is: 'Belarus',
    then: (schema) =>
      schema.matches(/^\d{6}$/, 'Value must be exactly 6 digits'),
  });

const billingPostalCodeSchema = yup
  .string()
  .required('Please input your postal code')
  .test(
    'no-leading-space',
    'Value must not contain leading or trailing whitespace',
    (value) => !value || value.trim() === value
  )
  .when('billingCountry', {
    is: 'Georgia',
    then: (schema) =>
      schema.matches(
        /^\d{4}$/,
        'Georgian postal code must be exactly 4 digits'
      ),
  })
  .when('billingCountry', {
    is: 'Belarus',
    then: (schema) =>
      schema.matches(
        /^\d{6}$/,
        'Belarusian postal code must be exactly 6 digits'
      ),
  });

const streetNameSchema = yup
  .string()
  .required('Please input your street name')
  .test(
    'no-leading-space',
    'Value must not contain leading or trailing whitespace',
    (value) => !value || value.trim() === value
  );

const firstNameShema = yup
  .string()
  .required('Please input your first name')
  .test(
    'no-leading-space',
    'Value must not contain leading or trailing whitespace',
    (value) => !value || value.trim() === value
  )
  .matches(/^[A-Za-z]+$/, 'Name must contain only letters')
  .matches(/^[A-Z]/, 'Name must be capitalized');

const lastNameSchema = yup
  .string()
  .required('Please input your last name')
  .test(
    'no-leading-space',
    'Value must not contain leading or trailing whitespace',
    (value) => !value || value.trim() === value
  )
  .matches(/^[A-Za-z]+$/, 'Last name must contain only letters')
  .matches(/^[A-Z]/, 'Last name must be capitalized');

const dateOfBirthSchema = yup
  .string()
  .transform((value, originalValue) => {
    return originalValue == null ? undefined : value;
  })
  .required('Please input your date of birth')
  .test(
    'is 13 or older',
    `You must be at least ${VALIDATION_RULES.MINIMUM_AGE} years old`,
    (value) => {
      if (!value) return true;
      const birthDate = dayjs(value);
      const thirteenYearsAgo = dayjs().subtract(
        VALIDATION_RULES.MINIMUM_AGE,
        'year'
      );
      return birthDate.isBefore(thirteenYearsAgo);
    }
  );

const emailSchema = yup
  .string()
  .test(
    'no-leading-space',
    'Value must not contain leading or trailing whitespace',
    (value) => !value || value.trim() === value
  )
  .required('Please input your email')
  .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email');

const passwordShema = yup
  .string()
  .required('Please input your password')
  .test(
    'no-leading-space',
    'Value must not contain leading or trailing whitespace',
    (value) => !value || value.trim() === value
  )
  .min(
    VALIDATION_RULES.PASSWORD_LENGTH,
    'Password must be at least 8 characters long'
  )
  .matches(
    /^(?=.*[a-z]).+$/,
    'Password must contain at least 1 lowercase letter'
  )
  .matches(
    /^(?=.*[A-Z]).+$/,
    'Password must contain at least 1 uppercase letter'
  )
  .matches(/^(?=.*\d).+$/, 'Password must contain at least 1 number');

export const schema = yup
  .object({
    firstName: firstNameShema,
    lastName: lastNameSchema,
    dateOfBirth: dateOfBirthSchema,
    email: emailSchema,
    password: passwordShema,
    country: countrySchema,
    city: citySchema,
    postalCode: postalCodeSchema,
    streetName: streetNameSchema,
    billingCountry: countrySchema,
    billingCity: citySchema,
    billingPostalCode: billingPostalCodeSchema,
    billingStreetName: streetNameSchema,
  })
  .required();

export const loginSchema = yup.object({
  email: emailSchema,
  password: passwordShema,
});

export const accountSchema = yup.object({
  firstName: firstNameShema,
  lastName: lastNameSchema,
  dateOfBirth: dateOfBirthSchema,
  email: emailSchema,
});

export const addressSchema = yup.object({
  country: countrySchema,
  city: citySchema,
  postalCode: postalCodeSchema,
  streetName: streetNameSchema,
});

export const passwordFormSchema = yup.object({
  password: passwordShema,
  newPassword: passwordShema.notOneOf(
    [yup.ref('password')],
    'New password must be different from current password'
  ),
});
