import { Alert } from 'antd';

type Props = {
  message: string;
};

const DiscountBanner = ({ message }: Props) => {
  return <Alert type="info" banner message={message}></Alert>;
};

export default DiscountBanner;
