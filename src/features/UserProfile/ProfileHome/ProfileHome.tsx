import FormField from '@components/FormField/FormField';
import { yupResolver } from '@hookform/resolvers/yup';
import useUserStore from '@store/userStore';
import { DATE_FORMAT } from '@utils/constants';
import { accountSchema } from '@utils/schema';
import { Button, DatePicker, Form, Typography } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AccountDetails } from 'types/registration';

const { Title } = Typography;

const ProfileHome = () => {
  const [disabled, setDisabled] = useState(true);
  const user = useUserStore((state) => state.user);

  const {
    control,
    formState: { isValid },
  } = useForm<AccountDetails>({
    resolver: yupResolver(accountSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      dateOfBirth: user?.dateOfBirth,
    },
  });

  if (!user) return null;

  return (
    <Form disabled={disabled} variant="underlined">
      <Title level={4}>Account Details</Title>
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
      {disabled ? (
        <Button disabled={false} onClick={() => setDisabled(false)}>
          Edit
        </Button>
      ) : (
        <Button disabled={!isValid} onClick={() => setDisabled(true)}>
          Save changes
        </Button>
      )}
    </Form>
  );
};

export default ProfileHome;
