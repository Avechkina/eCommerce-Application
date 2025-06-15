import ControlledNumberInput from '@components/ControlledNumberInput/ControlledNumberInput';
import getOrCreateCart from '@utils/getOrCreateCart';
import { Table, TableProps } from 'antd';
import { useEffect, useState } from 'react';
import CartProductCard from '../CartProductCard/CartProductCard';
import useCartStore from '@store/cartStore';
import { CartDetails, CartItem } from 'types/cart';
import { formatCartItems } from '@utils/formatCartItems';
import { formatPrice } from '@utils/formatPrice';

const CartTable = () => {
  const { items, setItems } = useCartStore((state) => state);
  const [cartDetails, setCartDetails] = useState<CartDetails>({
    id: '',
    version: 0,
  });

  const columns: TableProps<CartItem>['columns'] = [
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
      render: (value) => (
        <CartProductCard product={value} cartDetails={cartDetails} />
      ),
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
        const cart = await getOrCreateCart();
        setCartDetails({ id: cart.id, version: cart.version });
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
  }, []);

  return <Table<CartItem> columns={columns} dataSource={items} />;
};

export default CartTable;
