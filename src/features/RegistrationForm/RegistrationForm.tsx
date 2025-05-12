import { CustomerDraft, FormValues } from 'types/registration';
import { Alert, AutoComplete, Button, DatePicker, Form, Input } from 'antd';
import { useState } from 'react';
import createCustomer from '@utils/createCustomer';
import { Link, useNavigate } from 'react-router';
import useUserStore from '@store/userStore';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormField from '@components/FormField/FormField';
import { schema } from '@utils/schema';
import { countryList, countryOptions } from '@utils/countries';
import dayjs from 'dayjs';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState({
    message: '',
    visible: false,
  });
  const updateId = useUserStore((state) => state.updateId);
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const dateFormat = 'YYYY-MM-DD';

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      const trimmedValues = Object.fromEntries(
        Object.entries(values).map(([key, val]) => [
          key,
          typeof val === 'string' ? val.trim() : val,
        ])
      );
      const {
        firstName,
        lastName,
        dateOfBirth,
        email,
        password,
        country,
        city,
        postalCode,
        streetName,
      } = trimmedValues;
      const countryCode = countryList.find((c) => c.name === country)?.code;
      if (countryCode) {
        const customer: CustomerDraft = {
          key: crypto.randomUUID(),
          firstName,
          lastName,
          dateOfBirth,
          email,
          password,
          addresses: [{ country: countryCode, city, postalCode, streetName }],
        };
        const response = await createCustomer(customer);
        navigate('/');
        updateId(response.body.customer.id, true);
        console.log(response);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError({ message: error.message, visible: true });
      }
    }
  };

  const handleClose = () => {
    setError({ message: '', visible: false });
  };

  return (
    <>
      {error.visible && (
        <Alert
          message={error.message}
          afterClose={handleClose}
          type="error"
          closable
        />
      )}
      <p>
        Already have an account? <Link to="/signin">Sign in</Link>
      </p>
      <Form variant="underlined" onFinish={handleSubmit(onSubmit)}>
        <FormField
          name="firstName"
          placeholder="First name"
          control={control}
        />
        <FormField name="lastName" placeholder="Last name" control={control} />
        <FormField
          name="dateOfBirth"
          control={control}
          renderItem={(field) => (
            <DatePicker
              {...field}
              value={field.value ? dayjs(field.value) : undefined}
              onChange={(date) =>
                field.onChange(date ? date.format(dateFormat) : undefined)
              }
              disabledDate={(current) => current && current > dayjs()}
              placeholder="Date of birth"
            />
          )}
        />
        <FormField name="email" placeholder="Email address" control={control} />
        <FormField
          name="password"
          control={control}
          renderItem={(field) => (
            <Input.Password {...field} placeholder="Password" />
          )}
        />
        <FormField
          name="country"
          control={control}
          renderItem={(field) => (
            <AutoComplete
              {...field}
              options={countryOptions}
              filterOption
              style={{ textAlign: 'start' }}
              placeholder="Country"
            />
          )}
        />
        <FormField name="city" placeholder="City" control={control} />
        <FormField
          name="postalCode"
          placeholder="Postal code"
          control={control}
        />
        <FormField name="streetName" placeholder="Street" control={control} />
        <Form.Item>
          <Button disabled={!isValid} type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default RegistrationForm;
