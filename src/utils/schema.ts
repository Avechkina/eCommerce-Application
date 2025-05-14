import * as yup from 'yup';
import dayjs from 'dayjs';
import { COUNTRIES } from './countries';

const VALIDATION_RULES = {
  PASSWORD_LENGTH: 8,
  MINIMUM_AGE: 13,
};

export const schema = yup
  .object({
    firstName: yup
      .string()
      .trim()
      .required('Please input your first name')
      .matches(/^[A-Za-z]+$/, 'Name must contain only letters')
      .matches(/^[A-Z]/, 'Name must be capitalized'),
    lastName: yup
      .string()
      .trim()
      .required('Please input your last name')
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
    email: yup.string().trim().required('Please input your email').email(),
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
        /^(?=.*[A-P]).+$/,
        'Password must contain at least 1 uppercase letter'
      )
      .matches(/^(?=.*\d).+$/, 'Password must contain at least 1 number'),
    country: yup
      .string()
      .trim()
      .required('Please select your country')
      .test(
        'is valid country',
        'Select a valid country',
        (value) => !!value && COUNTRIES.some((c) => c.value === value)
      ),
    city: yup
      .string()
      .trim()
      .required('Please input your city name')
      .matches(/^[A-Za-z]+$/, 'City name must contain only letters'),
    postalCode: yup
      .string()
      .trim()
      .required('Please input your postal code')
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
      }),
    streetName: yup.string().trim().required('Please input your street name'),
  })
  .required();
