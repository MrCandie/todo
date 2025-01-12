import { Flex, Text } from "@chakra-ui/react";
import { FaListCheck } from "react-icons/fa6";
import { FaRegCalendarCheck } from "react-icons/fa";

export default function Header({
  view,
  setView,
}: {
  view: string;
  setView: (e: string) => void;
}) {
  return (
    <Flex
      width="100%"
      align="center"
      justify="space-between"
      boxShadow="md"
      bg="#202450"
      padding="1rem">
      <Text fontSize="16px" color="#fff" fontWeight="medium">
        {new Date().toLocaleDateString()}
      </Text>
      <Flex
        onClick={() => {
          if (view === "list") {
            setView("calendar");
          } else {
            setView("list");
          }
        }}
        border="1px solid #fff"
        p="0.5rem"
        borderRadius="0.4rem"
        align="center"
        cursor="pointer"
        shadow="lg"
        _hover={{ opacity: "90%" }}
        gap="0.5rem">
        {view === "list" ? (
          <FaRegCalendarCheck color="#fff" />
        ) : (
          <FaListCheck color="#fff" />
        )}
        <Text fontSize="16px" color="#fff" fontWeight="medium">
          {view === "list" ? "Calendar View" : "List View"}
        </Text>
      </Flex>
    </Flex>
  );
}
