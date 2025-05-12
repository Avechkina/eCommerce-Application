import { Form, Input } from 'antd';
import { ReactNode } from 'react';
import {
  Control,
  Controller,
  ControllerRenderProps,
  RegisterOptions,
} from 'react-hook-form';
import { FormValues } from 'types/registration';

type Props = {
  name: keyof FormValues;
  placeholder?: string;
  label?: string;
  control: Control<FormValues>;
  rules?: Omit<
    RegisterOptions<FormValues, keyof FormValues>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  renderItem?: (
    field: ControllerRenderProps<FormValues, keyof FormValues>
  ) => ReactNode;
};

const FormField = ({
  name,
  placeholder,
  label,
  control,
  rules,
  renderItem,
}: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <Form.Item
          label={label}
          validateStatus={fieldState.error ? 'error' : undefined}
          help={fieldState.error?.message}
        >
          {renderItem ? (
            renderItem(field)
          ) : (
            <Input {...field} placeholder={placeholder} />
          )}
        </Form.Item>
      )}
    ></Controller>
  );
};

export default FormField;
