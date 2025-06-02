import { Flex, Typography } from 'antd';
import ProfileDetailsForm from '../ProfileDetailsForm/ProfileDetailsForm';
import ProfilePasswordForm from '../ProfilePasswordForm/ProfilePasswordForm';

const { Title } = Typography;

const ProfileHome = () => {
  return (
    <Flex justify="center">
      <Flex align="flex-start" vertical>
        <Title level={4}>Account Details</Title>
        <ProfileDetailsForm />
        <Title level={4}>Password</Title>
        <ProfilePasswordForm />
      </Flex>
    </Flex>
  );
};

export default ProfileHome;
