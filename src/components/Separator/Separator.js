import React from "react";
import { Flex } from "@chakra-ui/react";

export function Separator(props) {
  const { variant, children, ...rest } = props;
  return (
    <Flex
      h="1px"
      w="100%"
      bg="linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, #000000 49.52%, rgba(0, 0, 0, 0) 100%)"
      {...rest}
    >
      {children}
    </Flex>
  );
}
