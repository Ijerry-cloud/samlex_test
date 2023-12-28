/*eslint-disable*/
import React from "react";
import { Flex, Link, List, ListItem, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

export default function Footer(props) {
  // const linkTeal = useColorModeValue("teal.400", "red.200");=
  return (
    <Flex
      flexDirection={{
        base: "column",
        xl: "row",
      }}
      alignItems={{
        base: "center",
        //xl: "start",
      }}
      justifyContent="space-between"
      //px="30px"
      backgroundColor="#232333"
      //zIndex={-3}

      
      position="fixed"  // Set position to fixed
      bottom="0"       // Place at the bottom of the screen
      width={
        {xl: "80%",
        sm: "100%"}
      }
      px={4}
    >
      <Text
        color="gray.400"
        textAlign={{
          base: "center",
          xl: "start",
        }}
        //mb={{ base: "20px", xl: "0px" }}
      >
        &copy; {1900 + new Date().getYear()},{" "}
        <Text as="span">
          {document.documentElement.dir === "rtl"
            ? " مصنوع من ❤️ بواسطة"
            : "Made with ❤️ by "}
        </Text>
        <Link
          // color={linkTeal}
          color="teal.400"
          href="#"
          target="_blank"
        >
          {document.documentElement.dir === "rtl"
            ? " توقيت الإبداعية"
            : "Connect Academy "}
        </Link>
        {document.documentElement.dir === "rtl"
          ? "للحصول على ويب أفضل"
          : " for a better web"}
      </Text>
      <List display="flex">
        <ListItem
          me={{
            base: "20px",
            md: "44px",
          }}
        >
          <Link
            color="gray.400"
            href="#"
          >
            {document.documentElement.dir === "rtl" ? "مدونة" : "Samlex Electronics"}
          </Link>
        </ListItem>
        <ListItem>
          <Link
            color="gray.400"
            href="#"
          >
            {document.documentElement.dir === "rtl" ? "رخصة" : "License"}
          </Link>
        </ListItem>
      </List>
    </Flex>
  );
}
