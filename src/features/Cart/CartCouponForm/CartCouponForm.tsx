import {
  Button,
  Flex,
  Form,
  FormProps,
  Input,
  message,
  Space,
  Typography,
} from 'antd';
import classes from './CartCouponForm.module.css';
import { PercentageOutlined } from '@ant-design/icons';
import applyDiscountCode from '@utils/applyDiscountCode';
import useCartStore from '@store/cartStore';
import { formatCartItems } from '@utils/formatCartItems';
import { formatPrice } from '@utils/formatPrice';

const { Title, Text } = Typography;

type FieldType = {
  code: string;
};

const CartCouponForm = () => {
  const [form] = Form.useForm();
  const { cartDetails, setItems, setOriginalPrice } = useCartStore(
    (state) => state
  );

  const codeValue = Form.useWatch('code', form);

  const handleSubmit: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      const response = await applyDiscountCode(
        cartDetails.id,
        cartDetails.version,
        values.code
      );
      const items = formatCartItems(response.body.lineItems);
      const totalPrice = response.body.totalPrice;
      const discount =
        response.body.discountOnTotalPrice?.discountedAmount.centAmount;
      const subtotal = formatPrice(
        totalPrice.centAmount,
        totalPrice.currencyCode
      );
      if (discount) {
        const originalPrice = formatPrice(
          totalPrice.centAmount + discount,
          totalPrice.currencyCode
        );
        setOriginalPrice(originalPrice);
      }
      setItems(items, subtotal);
      message.success({
        content: `Promocode applied!`,
        duration: 1,
      });
    } catch (error) {
      message.error({
        content: `Invalid promocode`,
        duration: 1,
      });
      console.error(error);
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit} className={classes.couponForm}>
      <Flex vertical gap="small">
        <Title style={{ margin: '0' }} level={4}>
          Have a coupon?
        </Title>
        <Text type="secondary">Add your code for an instant cart discount</Text>
        <Form.Item name="code">
          <Space.Compact>
            <Input placeholder="Coupon Code" prefix={<PercentageOutlined />} />
            <Button
              disabled={!codeValue || codeValue.trim() === ''}
              type="text"
              htmlType="submit"
            >
              Apply
            </Button>
          </Space.Compact>
        </Form.Item>
      </Flex>
    </Form>
  );
};

export default CartCouponForm;
