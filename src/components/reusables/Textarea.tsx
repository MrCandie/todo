import { FormControl, FormLabel, Textarea } from "@chakra-ui/react";

export default function TextareaComponent({
  label,
  type,
  placeholder,
  onChange,
  value,
  rows,
}: {
  label?: string;
  type?: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  rows?: number;
}) {
  return (
    <FormControl>
      {label && <FormLabel>{label}</FormLabel>}
      <Textarea
        rows={rows ? rows : 3}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        value={value}
      />
    </FormControl>
  );
}
