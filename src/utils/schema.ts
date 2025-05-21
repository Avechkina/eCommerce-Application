import * as yup from 'yup';
import dayjs from 'dayjs';
import { COUNTRIES } from './countries';

const VALIDATION_RULES = {
  PASSWORD_LENGTH: 8,
  MINIMUM_AGE: 13,
};

const countrySchema = yup
  .string()
  .required('Please select your country')
  .test(
    'no-leading-space',
    'Value cannot start with a space',
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
    'Value cannot start with a space',
    (value) => !value || value.trim() === value
  )
  .matches(/^[A-Za-z]+$/, 'City name must contain only letters');

const postalCodeSchema = yup
  .string()
  .required('Please input your postal code')
  .test(
    'no-leading-space',
    'Value cannot start with a space',
    (value) => !value || value.trim() === value
  )
  .when('country', {
    is: 'Georgia',
    then: (schema) =>
      schema.matches(
        /^\d{4}$/,
        'Georgian postal code must be exactly 4 digits'
      ),
  })
  .when('country', {
    is: 'Belarus',
    then: (schema) =>
      schema.matches(
        /^\d{6}$/,
        'Belarusian postal code must be exactly 6 digits'
      ),
  });

const billingPostalCodeSchema = yup
  .string()
  .required('Please input your postal code')
  .test(
    'no-leading-space',
    'Value cannot start with a space',
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
    'Value cannot start with a space',
    (value) => !value || value.trim() === value
  );

export const schema = yup
  .object({
    firstName: yup
      .string()
      .required('Please input your first name')
      .test(
        'no-leading-space',
        'Value cannot start with a space',
        (value) => !value || value.trim() === value
      )
      .matches(/^[A-Za-z]+$/, 'Name must contain only letters')
      .matches(/^[A-Z]/, 'Name must be capitalized'),
    lastName: yup
      .string()
      .required('Please input your last name')
      .test(
        'no-leading-space',
        'Value cannot start with a space',
        (value) => !value || value.trim() === value
      )
      .matches(/^[A-Za-z]+$/, 'Last name must contain only letters')
      .matches(/^[A-Z]/, 'Last name must be capitalized'),
    dateOfBirth: yup
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
      ),
    email: yup
      .string()
      .test(
        'no-leading-space',
        'Value cannot start with a space',
        (value) => !value || value.trim() === value
      )
      .required('Please input your email')
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Invalid email'
      ),
    password: yup
      .string()
      .trim()
      .required('Please input your password')
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
      .matches(/^(?=.*\d).+$/, 'Password must contain at least 1 number'),
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
  email: yup
    .string()
    .test(
      'no-leading-space',
      'Value cannot start with a space',
      (value) => !value || value.trim() === value
    )
    .required('Please input your email')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email'
    ),
  password: yup
    .string()
    .trim()
    .required('Please input your password')
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
    .matches(/^(?=.*\d).+$/, 'Password must contain at least 1 number'),
});
