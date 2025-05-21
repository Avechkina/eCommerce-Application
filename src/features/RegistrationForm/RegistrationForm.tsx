import { Address, CustomerDraft, FormValues } from 'types/registration';
import {
  Alert,
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  message,
} from 'antd';
import { useEffect, useState } from 'react';
import createCustomer from '@utils/createCustomer';
import { Link } from 'react-router';
import useUserStore from '@store/userStore';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormField from '@components/FormField/FormField';
import { schema } from '@utils/schema';
import dayjs from 'dayjs';
import { COUNTRIES } from '@utils/countries';
import classes from './RegestrationForm.module.css';
import AddressFieldGroup from '@components/AddressFieldGroup/AddressFieldGroup';

const RegistrationForm = () => {
  const [error, setError] = useState({
    message: '',
    visible: false,
  });
  const [isChecked, setIsChecked] = useState(false);
  const [isDefault, setIsDefault] = useState({
    shipping: false,
    billing: false,
  });
  const updateId = useUserStore((state) => state.updateId);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const shippingAddress = useWatch({
    control,
    name: ['country', 'city', 'postalCode', 'streetName'],
  });

  useEffect(() => {
    if (isChecked && shippingAddress) {
      setValue('billingCountry', shippingAddress[0], { shouldValidate: true });
      setValue('billingCity', shippingAddress[1], { shouldValidate: true });
      setValue('billingPostalCode', shippingAddress[2], {
        shouldValidate: true,
      });
      setValue('billingStreetName', shippingAddress[3], {
        shouldValidate: true,
      });
    }
  }, [isChecked, shippingAddress, setValue]);

  const dateFormat = 'YYYY-MM-DD';

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      const trimmedValues = Object.fromEntries(
        Object.entries(values).map(([key, val]) => [
          key,
          typeof val === 'string' ? val.trim() : val,
        ])
      );
      const {
        firstName,
        lastName,
        dateOfBirth,
        email,
        password,
        country,
        city,
        postalCode,
        streetName,
        billingCountry,
        billingCity,
        billingPostalCode,
        billingStreetName,
      } = trimmedValues;
      const countryCode = COUNTRIES.find((c) => c.value === country)?.code;
      const billingCountryCode = isChecked
        ? countryCode
        : COUNTRIES.find((c) => c.value === billingCountry)?.code;

      if (countryCode && billingCountryCode) {
        const shippingAddress: Address = {
          country: countryCode,
          city,
          postalCode,
          streetName,
        };
        const billingAddress: Address = {
          country: billingCountryCode,
          city: billingCity,
          postalCode: billingPostalCode,
          streetName: billingStreetName,
        };
        const addresses = isChecked
          ? [shippingAddress]
          : [shippingAddress, billingAddress];
        let defaultBillingAddress: number | undefined = undefined;
        if (isDefault.billing) {
          defaultBillingAddress = isChecked ? 0 : 1;
        }
        const customer: CustomerDraft = {
          key: crypto.randomUUID(),
          firstName,
          lastName,
          dateOfBirth,
          email,
          password,
          addresses,
          defaultShippingAddress: isDefault.shipping ? 0 : undefined,
          defaultBillingAddress: defaultBillingAddress,
        };
        const response = await createCustomer(customer);
        message.success({
          content: `Registration successful! Welcome aboard ${response.body.customer.firstName}.`,
          duration: 1,
          onClose: () => updateId(response.body.customer.id, true),
        });
        console.log(response);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError({ message: error.message, visible: true });
      }
    }
  };

  const handleClose = () => {
    setError({ message: '', visible: false });
  };

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      {error.visible && (
        <Alert
          message={error.message}
          afterClose={handleClose}
          type="error"
          closable
        />
      )}
      <p>
        Already have an account? <Link to="/signin">Sign in</Link>
      </p>
      <Form
        variant="underlined"
        onFinish={handleSubmit(onSubmit)}
        className={classes.form_registration}
      >
        <FormField
          name="firstName"
          placeholder="First name"
          control={control}
        />
        <FormField name="lastName" placeholder="Last name" control={control} />
        <FormField
          name="dateOfBirth"
          control={control}
          renderItem={(field) => (
            <DatePicker
              {...field}
              value={field.value ? dayjs(field.value) : undefined}
              onChange={(date) =>
                field.onChange(date ? date.format(dateFormat) : undefined)
              }
              disabledDate={(current) => current && current > dayjs()}
              placeholder="Date of birth"
            />
          )}
        />
        <FormField name="email" placeholder="Email address" control={control} />
        <FormField
          name="password"
          control={control}
          renderItem={(field) => (
            <Input.Password {...field} placeholder="Password" />
          )}
        />
        <AddressFieldGroup
          title="Shipping address"
          control={control}
          onChange={() =>
            setIsDefault({ ...isDefault, shipping: !isDefault.shipping })
          }
        />
        <Checkbox onChange={handleCheck}>
          Use the same address for billing and shipping
        </Checkbox>
        <AddressFieldGroup
          title="Billing address"
          isShipping={false}
          control={control}
          onChange={() =>
            setIsDefault({ ...isDefault, billing: !isDefault.billing })
          }
        />
        <Form.Item>
          <Button disabled={!isValid} type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default RegistrationForm;
