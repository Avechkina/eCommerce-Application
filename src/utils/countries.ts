import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';

countries.registerLocale(enLocale);

export const countryList = Object.entries(countries.getNames('en')).map(
  ([code, name]) => ({
    code,
    name,
  })
);

export const countryOptions = Object.entries(countries.getNames('en')).map(
  ([, name]) => ({
    value: name,
  })
);
