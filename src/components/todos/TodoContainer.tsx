import { Flex } from "@chakra-ui/react";
import Header from "./Header";
import SubHeader from "./SubHeader";
import AddButton from "./AddButton";
import { useState, useEffect } from "react";
import { getStoredItem } from "../../utils/lib";
import { listMyTodos } from "../../utils/https";
import { ITodo } from "../../interface";
import Loader from "../reusables/Loader";
import Calendar from "./CalendarView";
import Search from "./Search";

export default function TodoContainer() {
  const [data, setData] = useState<Array<ITodo>>([]);
  const [progress, setProgress] = useState<number>(0);
  const [view, setView] = useState<string>("list");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchData() {
      const user = getStoredItem("user");
      try {
        setProgress(20);
        setProgress(50);
        const response = await listMyTodos(user);
        setProgress(70);
        if (search) {
          const val = search.trim().toLowerCase();
          const filtered = response?.data?.filter(
            (el: ITodo) =>
              el?.name.toLowerCase().includes(val) ||
              el.description?.toLowerCase().includes(val) ||
              el?.category.toLowerCase().includes(val) ||
              el?.priority_level.toLowerCase().includes(val)
          );
          setData(filtered);
          setProgress(100);
          return;
        }
        setData(response?.data);
        setProgress(100);
      } catch (error) {
        setProgress(100);
      }
    }
    fetchData();
  }, [search]);
  return (
    <>
      <Loader progress={progress} setProgress={setProgress} />
      <Flex
        align="start"
        direction="column"
        width={{ lg: "60%", md: "40%", base: "100%" }}
        height="90vh"
        boxShadow="md">
        <Header view={view} setView={setView} />
        <Search val={search} setVal={setSearch} />
        {view === "list" ? (
          <SubHeader setData={setData} data={data} />
        ) : (
          <Calendar />
        )}
        <AddButton setData={setData} />
      </Flex>
    </>
  );
}
