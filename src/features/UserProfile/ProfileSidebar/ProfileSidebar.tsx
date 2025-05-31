import { Menu, MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { useLocation, useNavigate } from 'react-router';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: '/profile',
    label: 'Account',
  },
  {
    key: '/profile/address',
    label: 'Address',
  },
];

const ProfileSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Sider theme="light">
      <Menu
        items={items}
        selectedKeys={[location.pathname]}
        onSelect={(e) => navigate(e.key)}
      />
    </Sider>
  );
};

export default ProfileSidebar;
