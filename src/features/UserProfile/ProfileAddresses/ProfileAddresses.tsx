import useUserStore from '@store/userStore';
import { Flex, Typography } from 'antd';
import AddressCard from '@components/AddressCard/AddressCard';

const { Title } = Typography;

const ProfileAddresses = () => {
  const user = useUserStore((state) => state.user);

  if (!user) return null;

  const { addresses } = user;
  return (
    <>
      <Title level={4}>Address</Title>
      <Flex justify="center">
        {addresses.map((address) => (
          <AddressCard key={address.id} address={address} />
        ))}
      </Flex>
    </>
  );
};

export default ProfileAddresses;
