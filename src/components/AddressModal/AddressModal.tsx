import AddressFieldGroup from '@components/AddressFieldGroup/AddressFieldGroup';
import { yupResolver } from '@hookform/resolvers/yup';
import { COUNTRIES } from '@utils/constants';
import { addressSchema } from '@utils/schema';
import { Checkbox, Form, message, Modal } from 'antd';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Address } from 'types/registration';
import { MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import useUserStore from '@store/userStore';
import { tokenStore } from '@utils/tokenStore';
import { getApiRoot, getTokenClient } from '@services/BuildClient';
import updateCustomer from '@utils/updateCustomer';
import useModalStore from '@store/modalStore';
import { useEffect, useState } from 'react';
import { handleDefaultAddressActions } from '@utils/handleDefaultAddressActions';

const AddressModal = () => {
  const { user, updateUser } = useUserStore((state) => state);
  const { isOpen, closeModal, address } = useModalStore((state) => state);
  const [isDefault, setIsDefault] = useState({
    shipping: false,
    billing: false,
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<Address>({
    resolver: yupResolver(addressSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    reset({
      country: COUNTRIES.find((c) => c.code === address.country)?.value,
      city: address.city,
      postalCode: address.postalCode,
      streetName: address.streetName,
    });
    setIsDefault({
      shipping: address.id === user?.defaultShippingAddressId,
      billing: address.id === user?.defaultBillingAddressId,
    });
  }, [address, reset, user]);

  if (!user) return null;

  const hasChanges = (values: Address) => {
    const countryCode = COUNTRIES.find((c) => c.value === values.country)?.code;

    if (!address?.country) return true;

    const formChanged =
      countryCode !== address.country ||
      values.city !== address.city ||
      values.postalCode !== address.postalCode ||
      values.streetName !== address.streetName;

    const defaultsChanged =
      isDefault.shipping !== (address.id === user?.defaultShippingAddressId) ||
      isDefault.billing !== (address.id === user?.defaultBillingAddressId);

    return formChanged || defaultsChanged;
  };

  const onSubmit: SubmitHandler<Address> = async (values) => {
    try {
      const refreshToken = tokenStore.get().refreshToken;
      const coutryCode = COUNTRIES.find(
        (c) => c.value === values.country
      )?.code;
      if (!refreshToken || !coutryCode) return;
      if (!hasChanges(values)) {
        message.info({
          content: 'No changes made',
          duration: 1,
        });
        closeModal();
        return;
      }
      const actions: MyCustomerUpdateAction[] = [];
      actions.push({
        action: 'changeAddress',
        addressId: address.id,
        address: {
          country: coutryCode,
          city: values.city,
          postalCode: values.postalCode,
          streetName: values.streetName,
        },
      });
      handleDefaultAddressActions(actions, address.id, user, isDefault);

      const tokenClient = getTokenClient(refreshToken);
      const tokenApiRoot = getApiRoot(tokenClient);
      const response = await updateCustomer(
        tokenApiRoot,
        user.version,
        actions
      );
      closeModal();
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

  const addAddress: SubmitHandler<Address> = async (values) => {
    try {
      const refreshToken = tokenStore.get().refreshToken;
      const countryCode = COUNTRIES.find(
        (c) => c.value === values.country
      )?.code;

      if (!refreshToken || !countryCode) return;

      const actions: MyCustomerUpdateAction[] = [];

      actions.push({
        action: 'addAddress',
        address: {
          country: countryCode,
          city: values.city,
          postalCode: values.postalCode,
          streetName: values.streetName,
        },
      });

      const tokenClient = getTokenClient(refreshToken);
      const tokenApiRoot = getApiRoot(tokenClient);
      const addResponse = await updateCustomer(
        tokenApiRoot,
        user.version,
        actions
      );

      if (isDefault.shipping || isDefault.billing) {
        const updatedUser = addResponse.body;
        const newAddress = updatedUser.addresses?.find(
          (addr) =>
            addr.country === countryCode &&
            addr.city === values.city &&
            addr.postalCode === values.postalCode &&
            addr.streetName === values.streetName
        );
        console.log(newAddress);

        if (newAddress) {
          const defaultActions: MyCustomerUpdateAction[] = [];
          handleDefaultAddressActions(
            defaultActions,
            newAddress.id,
            user,
            isDefault
          );

          if (defaultActions.length > 0) {
            const finalResponse = await updateCustomer(
              tokenApiRoot,
              updatedUser.version,
              defaultActions
            );
            updateUser(finalResponse.body);
          } else {
            updateUser(updatedUser);
          }
        } else {
          updateUser(addResponse.body);
        }
      } else {
        updateUser(addResponse.body);
      }

      reset();
      closeModal();
      message.success({
        content: 'Address added!',
        duration: 1,
      });
    } catch (error) {
      message.error({
        content: 'Failed to add address, please try again',
        duration: 1,
      });
      console.error(error);
    }
  };

  const isEditMode = Boolean(address?.country);

  return (
    <Modal
      open={isOpen}
      title={isEditMode ? 'Edit Address' : 'Add New Address'}
      okButtonProps={{ disabled: !isValid }}
      okText={isEditMode ? 'Save changes' : 'Add address'}
      onCancel={closeModal}
      onOk={handleSubmit(isEditMode ? onSubmit : addAddress)}
    >
      <Form onFinish={handleSubmit(onSubmit)} variant="underlined">
        <AddressFieldGroup
          fieldNames={{
            country: 'country',
            city: 'city',
            postalCode: 'postalCode',
            streetName: 'streetName',
          }}
          control={control}
        />
        <Checkbox
          checked={isDefault.shipping}
          onChange={(e) =>
            setIsDefault((prev) => ({ ...prev, shipping: e.target.checked }))
          }
        >
          Set as default Shipping address
        </Checkbox>
        <Checkbox
          checked={isDefault.billing}
          onChange={(e) =>
            setIsDefault((prev) => ({ ...prev, billing: e.target.checked }))
          }
        >
          Set as default Billing address
        </Checkbox>
      </Form>
    </Modal>
  );
};

export default AddressModal;
