import { CustomerDraft, RegistrationFormFields } from 'types/registration';
import { AutoComplete, Button, DatePicker, Form, Input } from 'antd';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import { useMemo } from 'react';
import createCustomer from '@utils/createCustomer';

const RegistrationForm = () => {
  const [form] = Form.useForm();
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
        const newCustomer = await createCustomer(customer);
        console.log(newCustomer);
      }
    } catch (error) {
      console.log('Validation failed:', error);
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Form.Item
        name="firstName"
        rules={[{ required: true, message: 'Please input your first name!' }]}
      >
        <Input placeholder="First name" variant="underlined" />
      </Form.Item>
      <Form.Item
        name="lastName"
        rules={[{ required: true, message: 'Please input your last name!' }]}
      >
        <Input placeholder="Last name" variant="underlined" />
      </Form.Item>
      <Form.Item
        name="dateOfBirth"
        label="Date of birth"
        rules={[
          { required: true, message: 'Please input your date of birth!' },
        ]}
      >
        <DatePicker variant="underlined" />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          { type: 'email', message: 'The input is not valid E-mail!' },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input placeholder="Email address" variant="underlined" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password placeholder="Password" variant="underlined" />
      </Form.Item>
      <Form.Item
        name="country"
        rules={[{ required: true, message: 'Please input your country!' }]}
      >
        <AutoComplete
          placeholder="Country"
          options={countryOptions}
          filterOption
          variant="underlined"
          style={{ textAlign: 'start' }}
        />
      </Form.Item>
      <Form.Item
        name="city"
        rules={[{ required: true, message: 'Please input your city!' }]}
      >
        <Input placeholder="City" variant="underlined" />
      </Form.Item>
      <Form.Item
        name="postalCode"
        rules={[{ required: true, message: 'Please input your postal code!' }]}
      >
        <Input placeholder="Postal code" variant="underlined" />
      </Form.Item>
      <Form.Item
        name="streetName"
        rules={[{ required: true, message: 'Please input your street!' }]}
      >
        <Input placeholder="Street" variant="underlined" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;
