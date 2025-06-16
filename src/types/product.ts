export type Value = {
  key: string;
  label: string;
};

export type TProductAttribute = {
  name: string;
  value: string | boolean | Value | Value[];
};
