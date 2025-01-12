import { Flex, Input } from "@chakra-ui/react";
import React from "react";

export default function Search({
  val,
  setVal,
}: {
  val: string;
  setVal: (e: string) => void;
}) {
  return (
    <Flex p="1rem" align="center" w="100%">
      <Input
        bg="#eee"
        w={{ base: "100%", lg: "60%", md: "60%" }}
        placeholder="Search tasks..."
        h="50px"
        mx="auto"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setVal(e.target.value)
        }
        value={val}
      />
    </Flex>
  );
}
