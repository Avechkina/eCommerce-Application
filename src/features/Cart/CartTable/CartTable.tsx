import ControlledNumberInput from '@components/ControlledNumberInput/ControlledNumberInput';
import { formatPrice } from '@utils/formatPrice';
import getOrCreateCart from '@utils/getOrCreateCart';
import { getProductPrice } from '@utils/getProductPrice';
import { Table, TableProps } from 'antd';
import { useEffect, useState } from 'react';

type DataType = {
  key: string;
  product: string;
  quantity: number;
  price: string;
  subtotal: string;
};

const CartTable = () => {
  const [data, setData] = useState<DataType[]>();

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (value) => <ControlledNumberInput value={value} />,
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
        console.log(cart.lineItems);
        const items: DataType[] = cart.lineItems.map((item) => ({
          key: item.id,
          product: item.name['en-US'],
          quantity: item.quantity,
          price: getProductPrice(item),
          subtotal: formatPrice(
            item.totalPrice.centAmount,
            item.totalPrice.currencyCode
          ),
        }));
        setData(items);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return <Table<DataType> columns={columns} dataSource={data} />;
};

export default CartTable;
