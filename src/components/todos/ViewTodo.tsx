import ReusableModal from "../reusables/ReusableModal";
import { Flex, Button } from "@chakra-ui/react";
import TextareaComponent from "../reusables/Textarea";
import { useEffect, useState } from "react";
import InputComponent from "../reusables/Input";
import Priority from "../reusables/Priority";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { getStoredItem } from "../../utils/lib";
import {
  completeTodo,
  listMyTodos,
  updateTodo,
  viewTodo,
} from "../../utils/https";
import { IFormdata, ITodo } from "../../interface";
import { useToast } from "@chakra-ui/react";
import Category from "../reusables/Category";

export default function ViewTodo({
  isOpen,
  onClose,
  id,
  setData,
}: {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  setData: (e: Array<ITodo>) => void;
}) {
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingComplete, setLoadingComplete] = useState<boolean>(false);
  const [formData, setFormData] = useState<IFormdata>({
    name: "",
    description: "",
    start_date: "",
    priority_level: "",
    status: "",
  });

  const [todo, setTodo] = useState<ITodo>({
    name: "",
    status: "",
    priority_level: "",
    start_date: "",
    category: "",
    user: "",
    id: "",
    _id: "",
    description: "",
    createdAt: "",
    updatedAt: "",
    __v: 0,
  });

  useEffect(() => {
    async function fetchData() {
      if (!id) {
        return;
      }
      const user = getStoredItem("user");
      try {
        const response = await viewTodo(user, id);
        setTodo(response?.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [id]);

  useEffect(() => {
    setFormData({
      name: todo?.name,
      status: todo?.status,
      priority_level: todo?.priority_level,
      start_date: todo?.start_date,
      description: todo?.description ? todo?.description : "",
      category: todo?.category,
    });
  }, [todo]);

  const date = new Date(formData.start_date);

  const year = date.getFullYear();
  const day = date.getDate();
  const month = date.getMonth() + 1;

  async function updateHandler() {
    if (!formData.name || !formData.start_date) {
      toast({
        title: "Task name and start date required",
        description: "",
        status: "warning",
        position: "top-left",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    const user = getStoredItem("user");

    try {
      setLoading(true);
      const resp = await updateTodo(user, id, formData);
      const response = await listMyTodos(resp?.data?.user);
      setData(response?.data);
      toast({
        title: `Task updated`,
        description: ``,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      onClose();
      setLoading(false);
      setFormData({
        name: "",
        start_date: "",
        priority_level: "",
        description: "",
      });
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

  async function markCompleteHandler() {
    const user = getStoredItem("user");

    try {
      setLoadingComplete(true);
      const resp = await completeTodo(user, id, { status: "completed" });
      const response = await listMyTodos(resp?.data?.user);
      setData(response?.data);
      toast({
        title: `Task completed`,
        description: ``,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      onClose();
      setLoadingComplete(false);
    } catch (error: any) {
      setLoadingComplete(false);
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
    <ReusableModal isOpen={isOpen} onClose={onClose} title="View Todo">
      <Flex w="100%" align="start" direction="column" gap="1rem">
        <TextareaComponent
          label="Task Name"
          placeholder="Task Name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, name: e.target.value })
          }
          rows={2}
          value={formData.name}
        />
        <TextareaComponent
          label="Task Description"
          placeholder="Task Description"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={3}
          value={formData.description}
        />
        <InputComponent
          label="Start Date"
          placeholder="Start Date"
          type="date"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, start_date: e.target.value })
          }
          value={`${year?.toString()}-${month
            ?.toString()
            ?.padStart(2, "0")}-${day?.toString()}`}
        />
        <Priority formData={formData} setFormData={setFormData} />
        <Category formData={formData} setFormData={setFormData} />
        <Flex w="100%" justify="space-between" align="center" gap="0.3rem">
          <Button
            onClick={updateHandler}
            isLoading={loading}
            loadingText=""
            size="md"
            variant="solid"
            bg="#202450"
            color="#fff">
            Save
          </Button>
          {todo?.status && todo?.status !== "completed" && (
            <Button
              leftIcon={<IoMdCheckmarkCircleOutline />}
              size="xs"
              variant="outline"
              colorScheme="green"
              onClick={markCompleteHandler}
              isLoading={loadingComplete}
              loadingText="">
              Mark as Completed
            </Button>
          )}
        </Flex>
      </Flex>
    </ReusableModal>
  );
}
