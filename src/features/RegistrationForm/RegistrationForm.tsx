import { AutoComplete, Button, DatePicker, Form, Input } from 'antd';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import { useMemo } from 'react';

const RegistrationForm = () => {
  const [form] = Form.useForm();

  const countryList = useMemo(() => {
    countries.registerLocale(enLocale);
    return Object.entries(countries.getNames('en')).map(([, name]) => ({
      value: name,
    }));
  }, []);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log('Valid values:', values);
    } catch (error) {
      console.log('Validation failed:', error);
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Form.Item
        name="first name"
        rules={[{ required: true, message: 'Please input your first name!' }]}
      >
        <Input placeholder="First name" variant="underlined" />
      </Form.Item>
      <Form.Item
        name="last name"
        rules={[{ required: true, message: 'Please input your last name!' }]}
      >
        <Input placeholder="Last name" variant="underlined" />
      </Form.Item>
      <Form.Item name="date of birth" label="Date of birth">
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
          options={countryList}
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
        name="postal code"
        rules={[{ required: true, message: 'Please input your postal code!' }]}
      >
        <Input placeholder="Postal code" variant="underlined" />
      </Form.Item>
      <Form.Item
        name="street"
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
