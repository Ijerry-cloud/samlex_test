import {
  Avatar,
  AvatarGroup,
  Button,
  Center,
  Flex,
  Icon,
  IconButton,
  Progress,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { EmailIcon, DeleteIcon, EditIcon, DownloadIcon } from '@chakra-ui/icons'

export function DashboardTableRow4(props) {
  const { Date, name, units_purchased, unit_price, total_price } = props;
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Tr my=".8rem" ps="0px">
      <Td minWidth={{ sm: "150px" }} pl="0px">
        <Flex align="center" py=".3rem" minWidth="100%" flexWrap="nowrap">
          <Text
            fontSize="sm"
            color={textColor}
            fontWeight="bold"
            minWidth="100%"
          >
            {Date}
          </Text>
        </Flex>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem">
          {name}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem">
          {units_purchased}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem">
          {unit_price}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem">
          {total_price}
        </Text>
      </Td>

      <Td>
        <Center>
        <IconButton
          backgroundColor='blue'
          color='white'
          borderRadius='0px'
          aria-label='edit sale'
          icon={<EditIcon />}
          mx='1px'
        />
        <IconButton
          backgroundColor='red'
          color='white'
          borderRadius='0px'
          aria-label='delete sale'
          icon={<DeleteIcon />}
          mx='1px'
        />
        </Center>

      </Td>

    </Tr>
  );
}

export function DashboardTableRow3(props) {
  const { name, phone_no, email_address, total_purchased } = props;
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Tr my=".8rem" ps="0px">
      <Td minWidth={{ sm: "150px" }} pl="0px">
        <Flex align="center" py=".3rem" minWidth="100%" flexWrap="nowrap">
          <Text
            fontSize="sm"
            color={textColor}
            fontWeight="bold"
            minWidth="100%"
          >
            {name}
          </Text>
        </Flex>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem">
          {phone_no}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem">
          {email_address}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem">
          {total_purchased}
        </Text>
      </Td>

      <Td>
        <Center>
        <IconButton
          backgroundColor='blue'
          color='white'
          borderRadius='0px'
          aria-label='edit customer'
          icon={<EditIcon />}
          mx='1px'
        />
        <IconButton
          backgroundColor='red'
          color='white'
          borderRadius='0px'
          aria-label='delete customer'
          icon={<DeleteIcon />}
          mx='1px'
        />
        <IconButton
          backgroundColor='#5a8100'
          color='white'
          borderRadius='0px'
          aria-label='email customer'
          icon={<EmailIcon />}
          mx='1px'
        />
        </Center>

      </Td>

    </Tr>
  );
}

export function DashboardTableRow2(props) {
  const { Date, name, units_sold, unit_price, total_price } = props;
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Tr my=".8rem" ps="0px">
      <Td minWidth={{ sm: "150px" }} pl="0px">
        <Flex align="center" py=".3rem" minWidth="100%" flexWrap="nowrap">
          <Text
            fontSize="sm"
            color={textColor}
            fontWeight="bold"
            minWidth="100%"
          >
            {Date}
          </Text>
        </Flex>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem">
          {name}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem">
          {units_sold}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem">
          {unit_price}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem">
          {total_price}
        </Text>
      </Td>

      <Td>
        <Center>
        <IconButton
          backgroundColor='blue'
          color='white'
          borderRadius='0px'
          aria-label='edit sale'
          icon={<EditIcon />}
          mx='1px'
        />
        <IconButton
          backgroundColor='red'
          color='white'
          borderRadius='0px'
          aria-label='delete sale'
          icon={<DeleteIcon />}
          mx='1px'
        />
        <IconButton
          backgroundColor='#ffb400'
          color='white'
          borderRadius='0px'
          aria-label='download sale'
          icon={<DownloadIcon />}
          mx='1px'
        />
        </Center>

      </Td>

    </Tr>
  );
}

function DashboardTableRow(props) {
  const { logo, name, members, budget, progression } = props;
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Tr>
      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Icon as={logo} h={"24px"} w={"24px"} pe="5px" />
          <Text
            fontSize="md"
            color={textColor}
            fontWeight="bold"
            minWidth="100%"
          >
            {name}
          </Text>
        </Flex>
      </Td>

      <Td>
        <AvatarGroup size="sm">
          {members.map((member) => {
            return (
              <Avatar
                name="Ryan Florence"
                src={member}
                _hover={{ zIndex: "3", cursor: "pointer" }}
              />
            );
          })}
        </AvatarGroup>
      </Td>
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {budget}
        </Text>
      </Td>
      <Td>
        <Flex direction="column">
          <Text
            fontSize="md"
            color="teal.300"
            fontWeight="bold"
            pb=".2rem"
          >{`${progression}%`}</Text>
          <Progress
            colorScheme={progression === 100 ? "teal" : "cyan"}
            size="xs"
            value={progression}
            borderRadius="15px"
          />
        </Flex>
      </Td>
    </Tr>
  );
}

export default DashboardTableRow;
