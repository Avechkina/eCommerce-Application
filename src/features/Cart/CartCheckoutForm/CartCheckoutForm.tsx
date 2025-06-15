import { Divider, Form, Radio, RadioChangeEvent, Typography } from 'antd';
import { useState } from 'react';
import classes from './CartCheckoutForm.module.css';
import useCartStore from '@store/cartStore';

const { Title, Text } = Typography;
const style: React.CSSProperties = {
  border: '1px solid #6C7275',
  borderRadius: '4px',
  padding: '10px',
  maxWidth: '365px',
  width: '100%',
};

const CartCheckoutForm = () => {
  const [value, setValue] = useState(1);
  const subtotal = useCartStore((state) => state.subtotal);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const calculateTotal = () => {
    const addition = value === 2 ? 15 : 0;
    return `${(parseFloat(subtotal) + addition).toFixed(2)} USD`;
  };

  return (
    <Form className={classes.form}>
      <Title style={{ marginTop: '0', textAlign: 'start' }} level={4}>
        Cart summary
      </Title>
      <Radio.Group
        className={classes.radioGroup}
        value={value}
        onChange={onChange}
        options={[
          { value: 1, label: 'Free shipping', style: style },
          { value: 2, label: 'Express shipping $15.00', style: style },
          { value: 3, label: 'Pick Up', style: style },
        ]}
      />
      <div className={classes.grid}>
        <Text>Subtotal</Text>
        <Text strong>{subtotal}</Text>
        <Divider style={{ gridColumn: 'span 2', margin: '10px 0' }} />
        <Title level={5} style={{ margin: 0 }}>
          Total
        </Title>
        <Title level={5} style={{ margin: 0 }}>
          {calculateTotal()}
        </Title>
      </div>
    </Form>
  );
};

export default CartCheckoutForm;
