import { Button } from 'antd';
import { useNavigate } from 'react-router';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>NotFound</h1>
      <Button type="link" onClick={() => navigate('/')}>
        go home
      </Button>
    </>
  );
};

export default NotFound;
