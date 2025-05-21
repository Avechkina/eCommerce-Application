import FormField from '@components/FormField/FormField';
import { COUNTRIES } from '@utils/countries';
import { AutoComplete, Checkbox, Typography } from 'antd';
import { useMemo } from 'react';
import { Control } from 'react-hook-form';
import { FormValues } from 'types/registration';

type Props = {
  title: string;
  control: Control<FormValues>;
  isShipping?: boolean;
  onChange: () => void;
};

const { Title } = Typography;

const AddressFieldGroup = ({
  title,
  control,
  isShipping = true,
  onChange,
}: Props) => {
  const countryOptions = useMemo(
    () => COUNTRIES.map((country) => ({ value: country.value })),
    []
  );

  return (
    <>
      <Title level={5}>{title}</Title>
      <FormField
        name={isShipping ? 'country' : 'billingCountry'}
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
      <FormField
        name={isShipping ? 'city' : 'billingCity'}
        placeholder="City"
        control={control}
      />
      <FormField
        name={isShipping ? 'postalCode' : 'billingPostalCode'}
        placeholder="Postal code"
        control={control}
      />
      <FormField
        name={isShipping ? 'streetName' : 'billingStreetName'}
        placeholder="Street"
        control={control}
      />
      <Checkbox onChange={onChange}>Set as default {title}</Checkbox>
    </>
  );
};

export default AddressFieldGroup;
