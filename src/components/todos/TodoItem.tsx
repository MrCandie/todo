import { Flex, Text, Tag, Button, useDisclosure } from "@chakra-ui/react";
import { FaListCheck } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { BsListUl } from "react-icons/bs";
import { BsListCheck } from "react-icons/bs";
import ViewTodo from "./ViewTodo";
import { ITodo } from "../../interface";
import { useState } from "react";
import { deleteTodo, listMyTodos } from "../../utils/https";
import { getStoredItem } from "../../utils/lib";
import { useToast } from "@chakra-ui/react";

export default function TodoItem({
  item,
  setData,
  onDragStart,
}: {
  item: ITodo;
  setData: (e: Array<ITodo>) => void;
  onDragStart: (e: React.DragEvent) => void;
}) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [todo, setTodo] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  async function deleteHandler() {
    const user = getStoredItem("user");

    try {
      setLoading(true);
      await deleteTodo(user, item?.id);
      const response = await listMyTodos(user);
      setData(response?.data);
      toast({
        title: `Task deleted`,
        description: ``,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      onClose();
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast({
        title: `${error?.response?.data.message || "something went wrong"}`,
        description: ``,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  }

  return (
    <>
      <ViewTodo setData={setData} id={todo} isOpen={isOpen} onClose={onClose} />
      <div style={{ width: "100%" }} draggable onDragStart={onDragStart}>
        <Flex
          boxShadow="md"
          w="100%"
          direction="column"
          borderRadius="10px"
          bg="#fff"
          gap="1rem"
          padding="0.5rem">
          <Flex
            w="100%"
            align={{ lg: "center", md: "start", base: "start" }}
            bg="#fff"
            direction={{ lg: "row", md: "column", base: "column" }}
            gap="1rem"
            justify="space-between">
            <Flex
              align="center"
              borderRadius="100%"
              justify="center"
              padding="1rem"
              bg={
                item?.status === "pending"
                  ? "gray.100"
                  : item?.status === "completed"
                  ? "green.100"
                  : "yellow.100"
              }>
              {item?.status === "pending" ? (
                <BsListUl />
              ) : item?.status === "ongoing" ? (
                <FaListCheck />
              ) : (
                <BsListCheck />
              )}
            </Flex>
            <Flex align="start" direction="column" gap="0.4rem" flex="1">
              <Text
                fontSize="15px"
                color="#333"
                fontWeight="normal"
                textTransform="capitalize"
                align={{ lg: "center", md: "start", base: "start" }}
                display="flex">
                {item?.name} <Text fontSize="10px">({item?.category})</Text>
              </Text>
              <Flex align="center" gap="0.3rem">
                <Text
                  fontSize="13px"
                  color="#333"
                  fontWeight="normal"
                  textTransform="capitalize">
                  Priority:
                </Text>
                <Tag
                  size="sm"
                  variant="solid"
                  textTransform="capitalize"
                  colorScheme={
                    item?.priority_level === "high"
                      ? "red"
                      : item?.priority_level === "medium"
                      ? "yellow"
                      : "gray"
                  }>
                  {item?.priority_level}
                </Tag>
              </Flex>
            </Flex>
            <Flex align="center" gap="0.3rem">
              <Button
                onClick={() => {
                  setTodo(item?.id);
                  onOpen();
                }}
                size="xs"
                variant="ghost">
                <MdEdit />
              </Button>
              <Button
                onClick={deleteHandler}
                isLoading={loading}
                loadingText=""
                size="xs"
                variant="ghost"
                colorScheme="red">
                <AiOutlineDelete />
              </Button>
            </Flex>
          </Flex>
          <Flex
            align="center"
            w="100%"
            h="5px"
            bg="gray.200"
            borderRadius="10px">
            <Flex
              borderRadius="10px"
              zIndex={60}
              h="100%"
              w={item?.status?.toLowerCase() === "pending" ? "50%" : "100%"}
              bg={
                item?.status?.toLowerCase() === "pending"
                  ? "gray.500"
                  : "green.500"
              }
            />
          </Flex>
        </Flex>
      </div>
    </>
  );
}
