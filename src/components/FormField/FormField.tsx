import { Form, Input } from 'antd';
import { ReactNode } from 'react';
import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldPath,
  RegisterOptions,
} from 'react-hook-form';
// import { FormValues } from 'types/registration';

// type Props = {
//   name: keyof FormValues;
//   placeholder?: string;
//   label?: string;
//   control: Control<FormValues>;
//   rules?: Omit<
//     RegisterOptions<FormValues, keyof FormValues>,
//     'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
//   >;
//   renderItem?: (
//     field: ControllerRenderProps<FormValues, keyof FormValues>
//   ) => ReactNode;
// };

type FormFieldProps<T extends object> = {
  name: FieldPath<T>;
  placeholder?: string;
  label?: string;
  control: Control<T>;
  rules?: Omit<
    RegisterOptions<T, FieldPath<T>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  renderItem?: (field: ControllerRenderProps<T, FieldPath<T>>) => ReactNode;
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
