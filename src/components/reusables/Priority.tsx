import { Flex, Stack, Checkbox, Text } from "@chakra-ui/react";
import { IFormdata } from "../../interface";

export default function Priority({
  setFormData,
  formData,
}: {
  setFormData: (val: IFormdata) => void;
  formData: IFormdata;
}) {
  return (
    <Flex w="100%" align="start" direction="column" gap="1rem">
      <Text fontSize="15px" fontWeight="normal" color="#333">
        Priority Level
      </Text>
      <Stack spacing={5} direction="row">
        <Checkbox
          isChecked={formData.priority_level === "high"}
          onChange={() => setFormData({ ...formData, priority_level: "high" })}
          colorScheme="red"
        >
          High
        </Checkbox>
        <Checkbox
          isChecked={formData.priority_level === "medium"}
          onChange={() =>
            setFormData({ ...formData, priority_level: "medium" })
          }
          colorScheme="yellow"
          // defaultChecked
        >
          Medium
        </Checkbox>
        <Checkbox
          isChecked={formData.priority_level === "low"}
          onChange={() => setFormData({ ...formData, priority_level: "low" })}
          colorScheme="gray"
        >
          Low
        </Checkbox>
      </Stack>
    </Flex>
  );
}
