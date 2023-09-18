import React from "react";
import { Flex } from "@chakra-ui/react";

export function Separator(props) {
  const { variant, children, ...rest } = props;
  return (
    <Flex
      h="1px"
      w="100%"
      bg="linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #ffffff 49.52%, rgba(255, 255, 255, 0) 100%)"
      {...rest}
    >
      {children}
    </Flex>
  );
}
