import { Form } from 'antd';
import { Rule } from 'antd/es/form';
import { ReactNode } from 'react';

type Props = {
  name: string;
  required?: boolean;
  label: string;
  children: ReactNode;
  rules?: Rule[];
};

const RequiredField = ({
  name,
  required = true,
  label,
  children,
  rules = [],
}: Props) => {
  return (
    <Form.Item
      name={name}
      rules={
        required
          ? [
              ...rules,
              { required: true, message: ` Please input your ${label}!` },
            ]
          : rules
      }
    >
      {children}
    </Form.Item>
  );
};

export default RequiredField;
