import useSortingStore from '@store/sortingStore';
import { Dropdown, MenuProps, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const items = [
  {
    label: 'Lowest price',
    key: '0',
  },
  {
    label: 'Highest price',
    key: '1',
  },
];
export const SortProducts = () => {
  const sortLabel = useSortingStore((state) => state.sortLabel);
  const setValue = useSortingStore((state) => state.setSortingValue);
  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case '0':
        setValue('price asc', 'ascending');
        break;
      case '1':
        setValue('price desc', 'descending');
        break;
      default:
        break;
    }
  };

  return (
    <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={['click']}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>{`Sort${sortLabel && 'ed'} by ${sortLabel} price `} </Space>
        <DownOutlined />
      </a>
    </Dropdown>
  );
};
