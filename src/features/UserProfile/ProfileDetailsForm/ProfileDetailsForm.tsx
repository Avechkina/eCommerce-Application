import { MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import FormField from '@components/FormField/FormField';
import { yupResolver } from '@hookform/resolvers/yup';
import { getApiRoot, getTokenClient } from '@services/BuildClient';
import useUserStore from '@store/userStore';
import { DATE_FORMAT } from '@utils/constants';
import { accountSchema } from '@utils/schema';
import { tokenStore } from '@utils/tokenStore';
import updateCustomer from '@utils/updateCustomer';
import { Button, DatePicker, Flex, Form, message } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AccountDetails } from 'types/registration';

const ProfileDetailsForm = () => {
  const [disabled, setDisabled] = useState(true);
  const { user, updateUser } = useUserStore((state) => state);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<AccountDetails>({
    resolver: yupResolver(accountSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      dateOfBirth: user?.dateOfBirth,
      email: user?.email,
    },
  });

  if (!user) return null;

  const onSubmit: SubmitHandler<AccountDetails> = async (values) => {
    try {
      const refreshToken = tokenStore.get().refreshToken;
      if (!refreshToken) return;
      const { firstName, lastName, dateOfBirth, email } = values;
      if (
        firstName === user.firstName &&
        lastName === user.lastName &&
        dateOfBirth === user.dateOfBirth &&
        email === user.email
      ) {
        message.info({
          content: `No changes made`,
          duration: 1,
        });
        setDisabled(true);
        return;
      }
      const actions: MyCustomerUpdateAction[] = [];
      actions.push({ action: 'setFirstName', firstName });
      actions.push({ action: 'setLastName', lastName });
      actions.push({ action: 'setDateOfBirth', dateOfBirth });
      actions.push({ action: 'changeEmail', email });
      const tokenClient = getTokenClient(refreshToken);
      const tokenApiRoot = getApiRoot(tokenClient);
      const response = await updateCustomer(
        tokenApiRoot,
        user.version,
        actions
      );
      setDisabled(true);
      message.success({
        content: `Account details updated!`,
        duration: 1,
      });
      updateUser(response.body);
      console.log(response.body);
    } catch (error) {
      message.error({
        content: `Account details update failed, please try again`,
        duration: 1,
      });
      console.error(error);
    }
  };

  const cancelChanges = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    setDisabled(true);
    reset({
      firstName: user?.firstName,
      lastName: user?.lastName,
      dateOfBirth: user?.dateOfBirth,
      email: user?.email,
    });
  };

  return (
    <Form
      onFinish={handleSubmit(onSubmit)}
      disabled={disabled}
      variant="underlined"
      style={{ width: '100%' }}
    >
      <FormField name="firstName" placeholder="First name" control={control} />
      <FormField name="lastName" placeholder="Last name" control={control} />
      <FormField
        name="dateOfBirth"
        control={control}
        renderItem={(field) => (
          <DatePicker
            {...field}
            value={field.value ? dayjs(field.value) : null}
            onChange={(date) =>
              field.onChange(date ? date.format(DATE_FORMAT) : null)
            }
            disabledDate={(current) => current && current > dayjs()}
            placeholder="Date of birth"
          />
        )}
      />
      <FormField name="email" placeholder="Email address" control={control} />
      <Flex gap="small">
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
          <>
            <Button disabled={false} onClick={(e) => cancelChanges(e)}>
              Cancel
            </Button>
            <Button disabled={!isValid} type="primary" htmlType="submit">
              Save changes
            </Button>
          </>
        )}
      </Flex>
    </Form>
  );
};

export default ProfileDetailsForm;
