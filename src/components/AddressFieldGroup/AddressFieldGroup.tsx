import { Address } from '@commercetools/platform-sdk';
import FormField from '@components/FormField/FormField';
import { COUNTRIES } from '@utils/countries';
import { AutoComplete, Checkbox, Typography } from 'antd';
import { useMemo } from 'react';
import { Control } from 'react-hook-form';
import { FormValues } from 'types/registration';

type Props = {
  address?: Address;
  title?: string;
  control: Control<FormValues>;
  isShipping?: boolean;
  onChange?: () => void;
};

const { Title } = Typography;

const AddressFieldGroup = ({
  address,
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
      {title && <Title level={5}>{title}</Title>}
      <FormField
        name={isShipping ? 'country' : 'billingCountry'}
        control={control}
        renderItem={(field) => (
          <AutoComplete
            {...field}
            defaultValue={
              COUNTRIES.find((country) => country.code === address?.country)
                ?.value
            }
            options={countryOptions}
            filterOption
            style={{ textAlign: 'start' }}
            placeholder="Country"
          />
        )}
      />
      <FormField
        name={isShipping ? 'city' : 'billingCity'}
        value={address?.city}
        placeholder="City"
        control={control}
      />
      <FormField
        name={isShipping ? 'postalCode' : 'billingPostalCode'}
        value={address?.postalCode}
        placeholder="Postal code"
        control={control}
      />
      <FormField
        name={isShipping ? 'streetName' : 'billingStreetName'}
        value={address?.streetName}
        placeholder="Street"
        control={control}
      />
      {onChange && (
        <Checkbox onChange={onChange}>Set as default {title}</Checkbox>
      )}
    </>
  );
};

export default AddressFieldGroup;
