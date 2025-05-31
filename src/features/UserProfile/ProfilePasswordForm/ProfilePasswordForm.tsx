import FormField from '@components/FormField/FormField';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  getApiRoot,
  getAuthClient,
  getTokenClient,
} from '@services/BuildClient';
import useUserStore from '@store/userStore';
import changePassword from '@utils/changePassword';
import loginCustomer from '@utils/loginCustomer';
import { passwordFormSchema } from '@utils/schema';
import { tokenStore } from '@utils/tokenStore';
import { Button, Form, Input, message } from 'antd';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginFormValues } from 'types/authentication';
import { Password } from 'types/registration';

const ProfilePasswordForm = () => {
  const [disabled, setDisabled] = useState(true);
  const { user, updateUser } = useUserStore((state) => state);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<Password>({
    resolver: yupResolver(passwordFormSchema),
    mode: 'onChange',
  });

  if (!user) return null;

  const onSubmit: SubmitHandler<Password> = async (values) => {
    try {
      const refreshToken = tokenStore.get().refreshToken;
      if (!refreshToken) return;
      const { password, newPassword } = values;
      const tokenClient = getTokenClient(refreshToken);
      const tokenApiRoot = getApiRoot(tokenClient);
      const response = await changePassword(
        tokenApiRoot,
        user.version,
        password,
        newPassword
      );
      const customer: LoginFormValues = {
        email: user.email,
        password: newPassword,
      };
      tokenStore.resetToken();
      const authClient = getAuthClient(user.email, newPassword);
      const authApiRoot = getApiRoot(authClient);
      const authResponse = await loginCustomer(authApiRoot, customer);
      reset();
      setDisabled(true);
      message.success({
        content: `Password changed!`,
        duration: 1,
      });
      updateUser(response.body);
      console.log(authResponse.body.customer);
    } catch (error) {
      message.error({
        content: `Password change failed, please try again`,
        duration: 1,
      });
      console.error(error);
    }
  };

  return (
    <Form
      onFinish={handleSubmit(onSubmit)}
      disabled={disabled}
      variant="underlined"
      style={{ width: 600 }}
    >
      <FormField
        name="password"
        control={control}
        renderItem={(field) => (
          <Input.Password {...field} placeholder="Current password" />
        )}
      />
      <FormField
        name="newPassword"
        control={control}
        renderItem={(field) => (
          <Input.Password {...field} placeholder="New password" />
        )}
      />
      {disabled ? (
        <Button
          disabled={false}
          onClick={(e) => {
            e.preventDefault();
            setDisabled(false);
          }}
        >
          Edit
        </Button>
      ) : (
        <Button disabled={!isValid} htmlType="submit">
          Save changes
        </Button>
      )}
    </Form>
  );
};

export default ProfilePasswordForm;
