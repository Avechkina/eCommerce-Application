import { CustomerDraft, RegistrationFormFields } from 'types/registration';
import { AutoComplete, Button, DatePicker, Form, Input } from 'antd';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import { useMemo } from 'react';
import createCustomer from '@utils/createCustomer';
import { useNavigate } from 'react-router';
import RequiredField from '@components/RequiredFiled/RequiredField';

const RegistrationForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

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
  const statusCode = 201;

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
        if (response.statusCode !== statusCode) {
          return;
        }
        navigate('/');
        console.log(response);
      }
    } catch (error) {
      console.log('Validation failed:', error);
    }
  };

  const validateMessages = {
    required: "Please input your '${name}'!",
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      validateMessages={validateMessages}
    >
      <RequiredField name="firstName" label="first name">
        <Input placeholder="First name" variant="underlined" />
      </RequiredField>
      <RequiredField name="lastName" label="last name">
        <Input placeholder="Last name" variant="underlined" />
      </RequiredField>
      <RequiredField name="dateOfBirth" label="date of birth">
        <DatePicker variant="underlined" />
      </RequiredField>
      <RequiredField
        name="email"
        label="E-mail"
        rules={[{ type: 'email', message: 'The input is not valid E-mail!' }]}
      >
        <Input placeholder="Email address" variant="underlined" />
      </RequiredField>
      <RequiredField name="password" label="password">
        <Input.Password placeholder="Password" variant="underlined" />
      </RequiredField>
      <RequiredField name="country" required label="country">
        <AutoComplete
          placeholder="Country"
          options={countryOptions}
          filterOption
          variant="underlined"
          style={{ textAlign: 'start' }}
        />
      </RequiredField>
      <RequiredField name="city" label="city">
        <Input placeholder="City" variant="underlined" />
      </RequiredField>
      <RequiredField name="postalCode" label="postal code">
        <Input placeholder="Postal code" variant="underlined" />
      </RequiredField>
      <RequiredField name="streetName" label="street name">
        <Input placeholder="Street" variant="underlined" />
      </RequiredField>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;
