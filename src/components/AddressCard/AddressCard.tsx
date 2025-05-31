import AddressFieldGroup from '@components/AddressFieldGroup/AddressFieldGroup';
import { Button, Card, Form, message } from 'antd';
import { memo, useState } from 'react';
import classes from './AddressCard.module.css';
import useUserStore from '@store/userStore';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addressSchema } from '@utils/schema';
import {
  Address as CommerceToolsAddress,
  MyCustomerUpdateAction,
} from '@commercetools/platform-sdk';
import { COUNTRIES } from '@utils/constants';
import { Address } from 'types/registration';
import { tokenStore } from '@utils/tokenStore';
import { getApiRoot, getTokenClient } from '@services/BuildClient';
import updateCustomer from '@utils/updateCustomer';

type Props = {
  address: CommerceToolsAddress;
};

const AddressCard = memo(
  ({ address: { country, city, postalCode, streetName, id } }: Props) => {
    const [disabled, setDisabled] = useState(true);
    const { user, updateUser } = useUserStore((state) => state);

    const {
      control,
      handleSubmit,
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

    const onSubmit: SubmitHandler<Address> = async (values) => {
      try {
        const refreshToken = tokenStore.get().refreshToken;
        const coutryCode = COUNTRIES.find(
          (c) => c.value === values.country
        )?.code;
        if (!refreshToken || !coutryCode) return;
        if (
          coutryCode === country &&
          values.city === city &&
          values.postalCode === postalCode &&
          values.streetName === streetName
        ) {
          message.info({
            content: `No changes made`,
            duration: 1,
          });
          setDisabled(true);
          return;
        }
        const actions: MyCustomerUpdateAction[] = [];
        actions.push({
          action: 'changeAddress',
          addressId: id,
          address: {
            country: coutryCode,
            city: values.city,
            postalCode: values.postalCode,
            streetName: values.streetName,
          },
        });
        const tokenClient = getTokenClient(refreshToken);
        const tokenApiRoot = getApiRoot(tokenClient);
        const response = await updateCustomer(
          tokenApiRoot,
          user.version,
          actions
        );
        setDisabled(true);
        message.success({
          content: `Address updated!`,
          duration: 1,
        });
        updateUser(response.body);
        console.log(response.body);
      } catch (error) {
        message.error({
          content: `Address update failed, please try again`,
          duration: 1,
        });
        console.error(error);
      }
    };

    return (
      <Card style={{ width: 300 }}>
        <Form
          onFinish={handleSubmit(onSubmit)}
          disabled={disabled}
          variant="underlined"
        >
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
      </Card>
    );
  }
);

export default AddressCard;
