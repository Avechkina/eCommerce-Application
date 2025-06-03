import useUserStore from '@store/userStore';
import { Button, Flex, Typography } from 'antd';
import AddressCard from '@components/AddressCard/AddressCard';
import { PlusOutlined } from '@ant-design/icons';
import AddressModal from '@components/AddressModal/AddressModal';
import useModalStore from '@store/modalStore';

const { Title } = Typography;

const ProfileAddresses = () => {
  const user = useUserStore((state) => state.user);
  const openModal = useModalStore((state) => state.openModal);

  if (!user) return null;

  const { addresses } = user;
  return (
    <>
      <Title level={4}>Address</Title>
      <Flex justify="center" gap="small" wrap>
        {addresses.map((address) => (
          <AddressCard key={address.id} address={address} />
        ))}
        <Button type="primary" onClick={openModal}>
          <PlusOutlined key="add" />
          Add address
        </Button>
        <AddressModal />
      </Flex>
    </>
  );
};

export default ProfileAddresses;
