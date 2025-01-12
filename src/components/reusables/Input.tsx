import { FormControl, FormLabel, Input } from "@chakra-ui/react";

export default function InputComponent({
  label,
  type,
  placeholder,
  onChange,
  value,
}: {
  label?: string;
  type?: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}) {
  return (
    <FormControl>
      {label && <FormLabel>{label}</FormLabel>}
      <Input
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        value={value}
      />
    </FormControl>
  );
}
