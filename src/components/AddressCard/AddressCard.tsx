import AddressFieldGroup from '@components/AddressFieldGroup/AddressFieldGroup';
import { Button, Card, Form } from 'antd';
import { memo, useState } from 'react';
import classes from './AddressCard.module.css';
import useUserStore from '@store/userStore';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addressSchema } from '@utils/schema';
import { Address as CommerceToolsAddress } from '@commercetools/platform-sdk';
import { COUNTRIES } from '@utils/countries';
import { Address } from 'types/registration';

type Props = {
  address: CommerceToolsAddress;
};

const AddressCard = memo(
  ({ address: { country, city, postalCode, streetName, id } }: Props) => {
    const [disabled, setDisabled] = useState(true);
    const user = useUserStore((state) => state.user);

    const {
      control,
      formState: { isValid },
    } = useForm<Address>({
      resolver: yupResolver(addressSchema),
      mode: 'onChange',
      defaultValues: {
        country: COUNTRIES.find((c) => c.code === country)?.value,
        city,
        postalCode,
        streetName,
      },
    });

    if (!user) return null;

    return (
      <Card style={{ width: 300 }}>
        <Form disabled={disabled} variant="underlined">
          <p className={classes.title}>
            {id === user.defaultBillingAddressId
              ? 'Default Billing Address'
              : ''}
          </p>
          <p className={classes.title}>
            {id === user.defaultShippingAddressId
              ? 'Default Shipping Address'
              : ''}
          </p>
          <AddressFieldGroup
            fieldNames={{
              country: 'country',
              city: 'city',
              postalCode: 'postalCode',
              streetName: 'streetName',
            }}
            control={control}
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
      </Card>
    );
  }
);

export default AddressCard;
