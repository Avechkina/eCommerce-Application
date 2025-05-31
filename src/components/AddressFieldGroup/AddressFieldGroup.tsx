import FormField from '@components/FormField/FormField';
import { COUNTRIES } from '@utils/constants';
import { AutoComplete, Checkbox, Typography } from 'antd';
import { useMemo } from 'react';
import { Control, Path } from 'react-hook-form';

type Props<T extends object> = {
  title?: string;
  control: Control<T>;
  onChange?: () => void;
  fieldNames: {
    country: Path<T>;
    city: Path<T>;
    postalCode: Path<T>;
    streetName: Path<T>;
  };
};

const { Title } = Typography;

const AddressFieldGroup = <T extends object>({
  title,
  control,
  onChange,
  fieldNames: { country, city, postalCode, streetName },
}: Props<T>) => {
  const countryOptions = useMemo(
    () => COUNTRIES.map((country) => ({ value: country.value })),
    []
  );

  return (
    <>
      {title && <Title level={5}>{title}</Title>}
      <FormField
        name={country}
        control={control}
        renderItem={(field) => (
          <AutoComplete
            {...field}
            options={countryOptions}
            filterOption
            style={{ textAlign: 'start' }}
            placeholder="Country"
          />
        )}
      />
      <FormField name={city} placeholder="City" control={control} />
      <FormField
        name={postalCode}
        placeholder="Postal code"
        control={control}
      />
      <FormField name={streetName} placeholder="Street" control={control} />
      {onChange && (
        <Checkbox onChange={onChange}>Set as default {title}</Checkbox>
      )}
    </>
  );
};

export default AddressFieldGroup;
