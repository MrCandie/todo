import { MdChecklistRtl } from "react-icons/md";
import { FaListUl } from "react-icons/fa";
import TodoList from "./TodoList";
import { ITodo } from "../../interface";
import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";

export default function SubHeader({
  data,
  setData,
}: {
  data: Array<ITodo>;
  setData: (e: Array<ITodo>) => void;
}) {
  const [completedTodos, setCompletedTodos] = useState<Array<ITodo>>([]);
  const [pendingTodos, setPendingTodos] = useState<Array<ITodo>>([]);

  useEffect(() => {
    const completed = data.filter((el) => el.status === "completed");
    const pending = data.filter((el) => el.status === "pending");
    setCompletedTodos(completed);
    setPendingTodos(pending);
  }, [data]);

  return (
    <Flex width="100%" gap="10px">
      {/* Pending Tasks */}
      <Flex direction="column" w="100%" align="center">
        <Flex align="center" gap="8px" h="60px">
          <FaListUl />
          Pending ({pendingTodos.length})
        </Flex>
        <TodoList
          data={data}
          list={pendingTodos}
          setData={setData}
          status="pending"
        />
      </Flex>

      {/* Completed Tasks */}
      <Flex direction="column" w="100%" align="center">
        <Flex align="center" gap="8px" h="60px">
          <MdChecklistRtl />
          Completed ({completedTodos.length})
        </Flex>
        <TodoList
          data={data}
          list={completedTodos}
          setData={setData}
          status="completed"
        />
      </Flex>
    </Flex>
  );
}
