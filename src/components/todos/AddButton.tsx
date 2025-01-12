import { Flex, useDisclosure } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";
import AddTodo from "./AddTodo";
import { ITodo } from "../../interface";

export default function AddButton({
  setData,
}: {
  setData: (e: Array<ITodo>) => void;
}) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <AddTodo setData={setData} isOpen={isOpen} onClose={onClose} />
      <Flex
        position="fixed"
        bottom="10"
        left="0"
        w="100%"
        align="center"
        justify="center"
      >
        <Flex
          padding="1.5rem"
          borderRadius="100%"
          align="center"
          justify="center"
          bg="#2a2b54"
          color="#fff"
          boxShadow="xl"
          cursor="pointer"
          onClick={onOpen}
        >
          <FaPlus />
        </Flex>
      </Flex>
    </>
  );
}
