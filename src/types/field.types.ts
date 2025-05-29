export type FieldType = {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  customInput?: React.ReactNode;
};