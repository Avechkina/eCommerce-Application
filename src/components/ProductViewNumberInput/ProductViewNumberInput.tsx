import { InputNumber } from 'antd';

type Props = {
  value: number;
  onChange?: (value: number | null) => void;
};

const ProductViewNumberInput = ({ value, onChange }: Props) => {
  return (
    <InputNumber min={1} max={10} value={value} onChange={onChange} controls />
  );
};

export default ProductViewNumberInput;
