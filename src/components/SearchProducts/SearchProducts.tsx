import useSearchStore from '@store/searchStore';
import { Input, Typography } from 'antd';
import { useState } from 'react';
const { Search } = Input;
const { Text } = Typography;

const SearchProducts = () => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const minLength = 5;
  const setValue = useSearchStore((state) => state.setValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length > 0 && value.length < minLength) {
      setError(`Enter ${minLength - value.length} more characters`);
    } else {
      setError('');
    }
  };

  const handleSearch = (value: string) => {
    if (value.length < minLength) {
      setError(`Minimum search length: ${minLength} characters`);
      return;
    }
    setValue(value);
    setError('');
  };
  return (
    <>
      <Search
        style={{ maxWidth: '95%' }}
        placeholder="input search text"
        value={inputValue}
        allowClear
        enterButton="Search"
        size="large"
        onChange={handleChange}
        onSearch={handleSearch}
        onBlur={() => setError('')}
        status={error ? 'error' : ''}
      />
      {error && (
        <Text
          type="danger"
          style={{ fontSize: '12px', marginTop: '4px', display: 'block' }}
        >
          {error}
        </Text>
      )}
    </>
  );
};

export default SearchProducts;
