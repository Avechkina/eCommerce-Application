import { CustomerDraft, RegistrationFormFields } from 'types/registration';
import { Alert, AutoComplete, Button, DatePicker, Form, Input } from 'antd';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import { useMemo, useState } from 'react';
import createCustomer from '@utils/createCustomer';
import { Link, useNavigate } from 'react-router';
import RequiredField from '@components/RequiredFiled/RequiredField';
import useUserStore from '@store/userStore';

const RegistrationForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [error, setError] = useState({
    message: '',
    visible: false,
  });
  const updateId = useUserStore((state) => state.updateId);

  const countryList = useMemo(() => {
    countries.registerLocale(enLocale);
    return Object.entries(countries.getNames('en')).map(([code, name]) => ({
      code,
      name,
    }));
  }, []);

  const countryOptions = useMemo(() => {
    countries.registerLocale(enLocale);
    return Object.entries(countries.getNames('en')).map(([, name]) => ({
      value: name,
    }));
  }, []);

  const dateFormat = 'YYYY-MM-DD';

  const handleSubmit = async () => {
    try {
      const values: RegistrationFormFields = await form.validateFields();
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
      } = values;
      const countryCode = countryList.find((c) => c.name === country)?.code;
      if (countryCode) {
        const customer: CustomerDraft = {
          key: crypto.randomUUID(),
          firstName,
          lastName,
          dateOfBirth: dateOfBirth.format(dateFormat),
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

  const validateMessages = {
    required: "Please input your '${name}'!",
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
      <Form
        variant="underlined"
        form={form}
        onFinish={handleSubmit}
        validateMessages={validateMessages}
      >
        <RequiredField name="firstName" label="first name">
          <Input placeholder="First name" />
        </RequiredField>
        <RequiredField name="lastName" label="last name">
          <Input placeholder="Last name" />
        </RequiredField>
        <RequiredField name="dateOfBirth" label="date of birth">
          <DatePicker />
        </RequiredField>
        <RequiredField
          name="email"
          label="E-mail"
          rules={[{ type: 'email', message: 'The input is not valid E-mail!' }]}
        >
          <Input placeholder="Email address" />
        </RequiredField>
        <RequiredField name="password" label="password">
          <Input.Password placeholder="Password" />
        </RequiredField>
        <RequiredField name="country" required label="country">
          <AutoComplete
            placeholder="Country"
            options={countryOptions}
            filterOption
            style={{ textAlign: 'start' }}
          />
        </RequiredField>
        <RequiredField name="city" label="city">
          <Input placeholder="City" />
        </RequiredField>
        <RequiredField name="postalCode" label="postal code">
          <Input placeholder="Postal code" />
        </RequiredField>
        <RequiredField name="streetName" label="street name">
          <Input placeholder="Street" />
        </RequiredField>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default RegistrationForm;
