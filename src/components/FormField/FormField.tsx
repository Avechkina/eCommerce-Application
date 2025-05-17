import { Form, Input } from 'antd';
import { ReactNode } from 'react';
import {
  Control,
  Controller,
  ControllerRenderProps,
  Path,
  RegisterOptions,
} from 'react-hook-form';

type FormFieldProps<T extends object> = {
  name: Path<T>;
  placeholder?: string;
  label?: string;
  control: Control<T>;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  renderItem?: (field: ControllerRenderProps<T, Path<T>>) => ReactNode;
};

const FormField = <T extends object>({
  name,
  placeholder,
  label,
  control,
  rules,
  renderItem,
}: FormFieldProps<T>) => {
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
