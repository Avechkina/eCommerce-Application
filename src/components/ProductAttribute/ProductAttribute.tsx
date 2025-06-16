import { Flex, Typography } from 'antd';
import { TProductAttribute } from 'types/product';

const { Text } = Typography;

type Props = {
  attribute: TProductAttribute;
};

const ProductAttribute = ({ attribute }: Props) => {
  const camelCaseToNormal = (str: string) => {
    return str
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  };

  const renderValue = () => {
    if (Array.isArray(attribute.value)) {
      return (
        <Flex vertical align="start">
          {attribute.value.map((value) => (
            <Text key={value.key}>{value.label}</Text>
          ))}
        </Flex>
      );
    }

    if (typeof attribute.value === 'boolean') {
      return <Text>{attribute.value ? 'Yes' : 'No'}</Text>;
    }

    if (
      typeof attribute.value === 'object' &&
      attribute.value !== null &&
      'key' in attribute.value &&
      'label' in attribute.value
    ) {
      return <Text>{attribute.value.label}</Text>;
    }

    return <Text>{String(attribute.value)}</Text>;
  };

  return (
    <Flex vertical align="start">
      <Text type="secondary">{camelCaseToNormal(attribute.name)}</Text>
      <div>{renderValue()}</div>
    </Flex>
  );
};

export default ProductAttribute;
