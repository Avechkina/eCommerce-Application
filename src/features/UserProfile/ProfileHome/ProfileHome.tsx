import FormField from '@components/FormField/FormField';
import { yupResolver } from '@hookform/resolvers/yup';
import useUserStore from '@store/userStore';
import { schema } from '@utils/schema';
import { Button, DatePicker, Form, Typography } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormValues } from 'types/registration';

const { Title } = Typography;

const ProfileHome = () => {
  const [disabled, setDisabled] = useState(true);
  const user = useUserStore((state) => state.user);
  const {
    control,
    formState: { isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  if (!user) return;
  const { firstName, lastName, dateOfBirth } = user;
  const dateFormat = 'YYYY-MM-DD';

  return (
    <Form disabled={disabled} variant="underlined">
      <Title level={4}>Account Details</Title>
      <FormField
        name="firstName"
        value={firstName}
        placeholder="First name"
        control={control}
      />
      <FormField
        name="lastName"
        value={lastName}
        placeholder="Last name"
        control={control}
      />
      <FormField
        name="dateOfBirth"
        control={control}
        renderItem={(field) => (
          <DatePicker
            {...field}
            value={field.value ? dayjs(field.value) : dayjs(dateOfBirth)}
            onChange={(date) =>
              field.onChange(date ? date.format(dateFormat) : undefined)
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
