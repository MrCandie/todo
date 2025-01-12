import { Flex, Stack, Checkbox, Text } from "@chakra-ui/react";
import { IFormdata } from "../../interface";

export default function Category({
  setFormData,
  formData,
}: {
  setFormData: (val: IFormdata) => void;
  formData: IFormdata;
}) {
  return (
    <Flex w="100%" align="start" direction="column" gap="1rem">
      <Text fontSize="15px" fontWeight="normal" color="#333">
        Select Category
      </Text>
      <Stack spacing={5} direction="row">
        <Checkbox
          isChecked={formData.category === "work"}
          onChange={() => setFormData({ ...formData, category: "work" })}
          // colorScheme="red"
        >
          Work
        </Checkbox>
        <Checkbox
          isChecked={formData.category === "personal"}
          onChange={() => setFormData({ ...formData, category: "personal" })}
          // colorScheme="yellow"
          // defaultChecked
        >
          Personal
        </Checkbox>
        <Checkbox
          isChecked={formData.category === "urgent"}
          onChange={() => setFormData({ ...formData, category: "urgent" })}
          // colorScheme="gray"
        >
          Urgent
        </Checkbox>
      </Stack>
    </Flex>
  );
}
