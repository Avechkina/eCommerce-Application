import { Alert, Button, Form, Input } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router';
import useUserStore from '@store/userStore';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormField from '@components/FormField/FormField';
import { loginSchema } from '@utils/schema';
import { LoginFormValues } from 'types/authentication';
import loginCustomer from '@utils/loginCustomer';

const LoginForm = () => {
  const [error, setError] = useState({
    message: '',
    visible: false,
  });

  const updateId = useUserStore((state) => state.updateId);
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    try {
      const trimmedValues = Object.fromEntries(
        Object.entries(values).map(([key, val]) => [
          key,
          typeof val === 'string' ? val.trim() : val,
        ])
      );
      const { email, password } = trimmedValues;
      const customer: LoginFormValues = {
        email,
        password,
      };
      const response = await loginCustomer(customer);
      console.log(response);
      updateId(response.body.customer.id, true);
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
        Don’t have an accout yet? <Link to="/signup">Sign up</Link>
      </p>
      <Form variant="underlined" onFinish={handleSubmit(onSubmit)}>
        <FormField name="email" placeholder="Email address" control={control} />
        <FormField
          name="password"
          control={control}
          renderItem={(field) => (
            <Input.Password {...field} placeholder="Password" />
          )}
        />

        <Form.Item>
          <Button disabled={!isValid} type="primary" htmlType="submit">
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;
