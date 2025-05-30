import AddressFieldGroup from '@components/AddressFieldGroup/AddressFieldGroup';
import { yupResolver } from '@hookform/resolvers/yup/src/yup.js';
import useUserStore from '@store/userStore';
import { schema } from '@utils/schema';
import { Button, Card, Flex, Form, Typography } from 'antd';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormValues } from 'types/registration';
import classes from './ProfileAddresses.module.css';

const { Title } = Typography;

const ProfileAddresses = () => {
  const [disabled, setDisabled] = useState(true);
  const {
    control,
    formState: { isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const user = useUserStore((state) => state.user);

  if (!user) return;

  const { addresses } = user;
  return (
    <>
      <Title level={4}>Address</Title>
      <Flex justify="center">
        {addresses.map((address) => (
          <Card key={address.id} style={{ width: 300 }}>
            <Form disabled={disabled} variant="underlined">
              <p className={classes.title}>
                {address.id === user.defaultBillingAddressId
                  ? 'Default Billing Address'
                  : ''}
              </p>
              <p className={classes.title}>
                {address.id === user.defaultShippingAddressId
                  ? 'Default Shipping Address'
                  : ''}
              </p>
              <AddressFieldGroup control={control} address={address} />
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
          </Card>
        ))}
      </Flex>
    </>
  );
};

export default ProfileAddresses;
