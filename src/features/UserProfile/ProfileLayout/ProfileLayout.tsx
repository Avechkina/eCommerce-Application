import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import ProfileSidebar from '../ProfileMenu/ProfileSidebar';
import { Outlet } from 'react-router';

const ProfileLayout = () => {
  return (
    <Layout>
      <ProfileSidebar />
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default ProfileLayout;
