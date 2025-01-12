import { Flex, Image } from "@chakra-ui/react";
import TodoItem from "./TodoItem";
import { ITodo } from "../../interface";
import Empty from "../reusables/Empty";
import { getStoredItem } from "../../utils/lib";
import { useToast } from "@chakra-ui/react";
import { completeTodo, listMyTodos } from "../../utils/https";

export default function TodoList({
  list,
  setData,
  status,
  data,
}: {
  list: ITodo[];
  data: ITodo[];
  setData: (e: ITodo[]) => void;
  status: "pending" | "completed";
}) {
  const toast = useToast();
  // Handle when a task is dragged
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("todoId", id);
  };

  // Allow dropping by preventing the default behavior
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Handle when a task is dropped
  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const user = getStoredItem("user");
    const todoId = e.dataTransfer.getData("todoId");

    try {
      const resp = await completeTodo(user, todoId, {
        status,
      });
      const response = await listMyTodos(resp?.data?.user);
      setData(response?.data);
      toast({
        title: `Task marked as ${status}`,
        description: ``,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error: any) {
      toast({
        title: `${error?.response?.data.message || "something went wrong"}`,
        description: ``,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }

    const tasks = data.map((todo) =>
      todo.id === todoId ? { ...todo, status } : todo
    );

    setData(tasks);
  };

  return (
    <Flex width="100%" align="center" height="100%">
      <Flex
        w="100%"
        height="100%"
        position="relative"
        onDragOver={handleDragOver}
        onDrop={handleDrop}>
        <Image
          width="100%"
          src="/bg.png"
          height={{ lg: "85vh", md: "85vh", base: "88vh" }}
          fit="cover"
        />
        <Flex
          height="100%"
          position="absolute"
          top="0"
          left="0"
          w="100%"
          align="start"
          direction="column"
          gap="1rem"
          overflow="scroll"
          padding="1rem">
          {list?.length === 0 ? (
            <Empty />
          ) : (
            <>
              {list.map((el: ITodo, i: number) => (
                <TodoItem
                  setData={setData}
                  item={el}
                  key={i}
                  onDragStart={(e) => handleDragStart(e, el.id)}
                />
              ))}
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}
