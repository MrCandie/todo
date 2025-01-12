import { Flex } from "@chakra-ui/react";
import TodoContainer from "./TodoContainer";

export default function Todo() {
  return (
    <Flex w="100%" align="center" jusify="center" direction="column" gap="1rem">
      <TodoContainer />
    </Flex>
  );
}
