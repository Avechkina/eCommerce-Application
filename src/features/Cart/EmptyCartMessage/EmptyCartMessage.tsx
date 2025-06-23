import { AppstoreOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router';

const { Title, Text } = Typography;

const EmptyCartMessage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '48px 24px' }}>
      <ShoppingCartOutlined
        style={{ fontSize: '64px', color: '#d9d9d9', marginBottom: '16px' }}
      />
      <Title level={3} style={{ color: '#595959' }}>
        Your cart is empty
      </Title>
      <Text
        type="secondary"
        style={{ fontSize: '16px', display: 'block', marginBottom: '24px' }}
      >
        Looks like you haven't added anything to your cart yet. Let's find you
        something amazing!
      </Text>
      <Button
        onClick={() => navigate('/catalog')}
        type="primary"
        size="large"
        icon={<AppstoreOutlined />}
      >
        Browse Products
      </Button>
    </div>
  );
};

export default EmptyCartMessage;
