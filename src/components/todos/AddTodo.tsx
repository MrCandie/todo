import { useState } from "react";
import InputComponent from "../reusables/Input";
import ReusableModal from "../reusables/ReusableModal";
import { Flex, Button, useToast } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import Priority from "../reusables/Priority";
import { addTodo, listMyTodos } from "../../utils/https";
import { getStoredItem, storeItem } from "../../utils/lib";
import { IFormdata, ITodo } from "../../interface";
import TextareaComponent from "../reusables/Textarea";
import Category from "../reusables/Category";

export default function AddTodo({
  isOpen,
  onClose,
  setData,
}: {
  isOpen: boolean;
  onClose: () => void;
  setData: (e: Array<ITodo>) => void;
}) {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [formData, setFormData] = useState<IFormdata>({
    name: "",
    start_date: "",
    priority_level: "medium",
    description: "",
    category: "",
  });

  async function addHandler() {
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
    const data = {
      ...formData,
      user,
    };

    try {
      setLoading(true);
      const resp = await addTodo(data);
      storeItem("user", resp?.data?.user, 86400000000);
      const response = await listMyTodos(resp?.data?.user);
      setData(response?.data);
      toast({
        title: `New task added`,
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
        category: "",
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

  return (
    <ReusableModal isOpen={isOpen} onClose={onClose} title="Add Todo">
      <Flex w="100%" align="start" direction="column" gap="1rem">
        <InputComponent
          placeholder="Task Name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, name: e.target.value })
          }
          value={formData.name}
        />
        <TextareaComponent
          placeholder="Task Description (OPTIONAL)"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={3}
          value={formData.description}
        />
        <InputComponent
          placeholder="Start Date"
          type="date"
          label="Start Date"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, start_date: e.target.value })
          }
          value={formData.start_date}
        />
        <Priority setFormData={setFormData} formData={formData} />
        <Category setFormData={setFormData} formData={formData} />
        <Button
          leftIcon={<FaPlus />}
          w="100%"
          size="md"
          variant="solid"
          bg="#202450"
          color="#fff"
          isLoading={loading}
          loadingText="Adding..."
          onClick={addHandler}>
          Add
        </Button>
      </Flex>
    </ReusableModal>
  );
}
