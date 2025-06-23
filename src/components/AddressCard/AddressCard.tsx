import { Button, Card, message } from 'antd';
import { memo } from 'react';
import useUserStore from '@store/userStore';
import {
  Address as CommerceToolsAddress,
  MyCustomerUpdateAction,
} from '@commercetools/platform-sdk';
import { COUNTRIES } from '@utils/constants';
import { tokenStore } from '@utils/tokenStore';
import { getApiRoot, getTokenClient } from '@services/BuildClient';
import updateCustomer from '@utils/updateCustomer';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { getCardTitle } from '@utils/getCardTitle';
import classes from './AddressCard.module.css';
import { isDefaultCard } from '@utils/isDefaultCard';
import useModalStore from '@store/modalStore';

type Props = {
  address: CommerceToolsAddress;
  className?: string;
};

const AddressCard = memo(
  ({
    address: { country, city, postalCode, streetName, id },
    className,
  }: Props) => {
    const { user, updateUser } = useUserStore((state) => state);
    const setAddress = useModalStore((state) => state.setAddress);
    const countryName = COUNTRIES.find((c) => c.code === country)?.value;

    if (!user) return null;

    const actions: React.ReactNode[] = [
      <Button
        type="link"
        onClick={() =>
          setAddress({ country, city, postalCode, streetName, id })
        }
      >
        <EditOutlined key="edit" />
        Edit
      </Button>,
      <Button type="link" onClick={() => removeAddress()}>
        <DeleteOutlined key="remove" />
        Remove
      </Button>,
    ];

    const removeAddress = async () => {
      try {
        const refreshToken = tokenStore.get().refreshToken;
        if (!refreshToken) return;
        const actions: MyCustomerUpdateAction[] = [];
        actions.push({
          action: 'removeAddress',
          addressId: id,
        });
        const tokenClient = getTokenClient(refreshToken);
        const tokenApiRoot = getApiRoot(tokenClient);
        const response = await updateCustomer(
          tokenApiRoot,
          user.version,
          actions
        );
        message.success({
          content: `Address removed!`,
          duration: 1,
        });
        updateUser(response.body);
      } catch (error) {
        message.error({
          content: `Failed to remove address, please try again`,
          duration: 1,
        });
        console.error(error);
      }
    };

    return (
      <Card
        className={
          (className ?? isDefaultCard(id, user)) ? classes.default : undefined
        }
        title={getCardTitle(id, user)}
        actions={actions}
        size="small"
        style={{ maxWidth: 200, width: '100%' }}
      >
        <p>{`${streetName}, ${city}, ${postalCode}, ${countryName}`}</p>
      </Card>
    );
  }
);

export default AddressCard;
