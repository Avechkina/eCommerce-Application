import ControlledNumberInput from '@components/ControlledNumberInput/ControlledNumberInput';
import getOrCreateCart from '@utils/getOrCreateCart';
import { Table, TableProps } from 'antd';
import { useEffect } from 'react';
import CartProductCard from '../CartProductCard/CartProductCard';
import useCartStore from '@store/cartStore';
import { CartItem } from 'types/cart';
import { formatCartItems } from '@utils/formatCartItems';
import { formatPrice } from '@utils/formatPrice';

const CartTable = () => {
  const { items, setItems, cartDetails, setDetails } = useCartStore(
    (state) => state
  );

  const columns: TableProps<CartItem>['columns'] = [
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
      render: (value) => (
        <CartProductCard product={value} cartDetails={cartDetails} />
      ),
      width: 220,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (value, record) => (
        <ControlledNumberInput
          value={value}
          productId={record.product.id}
          cartDetails={cartDetails}
        />
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Subtotal',
      dataIndex: 'subtotal',
      key: 'subtotal',
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cart = await getOrCreateCart(cartDetails.id);
        setDetails({ id: cart.id, version: cart.version });
        const items = formatCartItems(cart.lineItems);
        const totalPrice = cart.totalPrice;
        const subtotal = formatPrice(
          totalPrice.centAmount,
          totalPrice.currencyCode
        );
        setItems(items, subtotal);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [cartDetails.id, setDetails, setItems]);

  return (
    <Table<CartItem>
      scroll={{ y: 350 }}
      pagination={false}
      columns={columns}
      dataSource={items}
    />
  );
};

export default CartTable;
