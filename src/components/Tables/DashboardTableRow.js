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
import { EmailIcon, DeleteIcon, EditIcon, DownloadIcon, InfoIcon } from '@chakra-ui/icons'
import avatar7 from "assets/img/avatars/male.jpg";
import avatar8 from "assets/img/avatars/female.png";


export function DashboardTableRow11(props) {
  const { firstName, lastName, phoneNo, emailAddress, gender, onEditClick, onDeleteClick } = props;
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Tr my=".8rem" ps="0px">
      <Td minWidth={{ sm: "150px" }} pl="0px">
        <Flex align="center" py=".3rem" minWidth="100%" flexWrap="nowrap">
          <Avatar
            src={gender == "female" ? avatar8 : avatar7}
            w="50px"
            h="50px"
            me="10px"
          />
          <Text
            fontSize="md"
            color={"white"}
            fontWeight="bold"
            minWidth="100%"
          >
            {firstName}
          </Text>
        </Flex>
      </Td>

      <Td>
        <Text fontSize="md" color={"gray.500"} fontWeight="bold" pb=".3rem">
          {lastName}
        </Text>
      </Td>

      <Td>
        <Text fontSize="md" color={"gray.500"} fontWeight="bold" pb=".3rem">
          {phoneNo}
        </Text>
      </Td>

      <Td>
        <Text fontSize="md" color={"gray.500"} fontWeight="bold" pb=".3rem">
          {emailAddress}
        </Text>
      </Td>

      <Td>
        <Center>
          <IconButton
            backgroundColor='blue'
            color='white'
            aria-label='edit customer'
            icon={<EditIcon />}
            onClick={onEditClick}
            mx='2px'
          />
          <IconButton
            backgroundColor='red'
            color='white'
            aria-label='delete customer'
            icon={<DeleteIcon />}
            onClick={onDeleteClick}
            mx='2px'
          />
          <IconButton
            backgroundColor='#5a8100'
            color='white'
            aria-label='email customer'
            icon={<EmailIcon />}
            mx='2px'
          />
        </Center>

      </Td>

    </Tr>
  );
}

export function DashboardTableRow10(props) {
  const { employee, subtotal, total, tax, profit } = props;
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Tr my=".8rem" ps="0px">
      <Td minWidth={{ sm: "100px" }} pl="0px">
        <Flex align="center" py=".3rem" minWidth="100%" flexWrap="nowrap">
          <Text
            fontSize="sm"
            color={textColor}
            fontWeight="bold"
            minWidth="100%"
          >
            {employee}
          </Text>
        </Flex>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem">
          {subtotal}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem">
          {total}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem">
          {tax}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem">
          {profit}
        </Text>
      </Td>

    </Tr>
  );
}

export function DashboardTableRow9(props) {
  const { item, quantity_purchased, subtotal, total, tax, profit } = props;
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Tr my=".8rem" ps="0px">
      <Td minWidth={{ sm: "100px" }} pl="0px">
        <Flex align="center" py=".3rem" minWidth="100%" flexWrap="nowrap">
          <Text
            fontSize="sm"
            color={textColor}
            fontWeight="bold"
            minWidth="100%"
          >
            {item}
          </Text>
        </Flex>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem" align="right">
          {quantity_purchased}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem" align="right">
          {subtotal}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem" align="right">
          {total}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem" align="right">
          {tax}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem" align="right">
          {profit}
        </Text>
      </Td>

    </Tr>
  );
}

export function DashboardTableRow8(props) {
  const { customer, subtotal, total, tax, profit } = props;
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Tr my=".8rem" ps="0px">
      <Td minWidth={{ sm: "100px" }} pl="0px">
        <Flex align="center" py=".3rem" minWidth="100%" flexWrap="nowrap">
          <Text
            fontSize="sm"
            color={textColor}
            fontWeight="bold"
            minWidth="100%"
          >
            {customer}
          </Text>
        </Flex>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem">
          {subtotal}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem">
          {total}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem">
          {tax}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem">
          {profit}
        </Text>
      </Td>

    </Tr>
  );
}


export function DashboardTableRow7(props) {
  const { date, subtotal, total, tax, profit } = props;
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Tr my=".8rem" ps="0px">
      <Td minWidth={{ sm: "100px" }} pl="0px">
        <Flex align="center" py=".3rem" minWidth="100%" flexWrap="nowrap">
          <Text
            fontSize="sm"
            color={textColor}
            fontWeight="bold"
            minWidth="100%"
          >
            {date}
          </Text>
        </Flex>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem">
          {subtotal}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem">
          {total}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem">
          {tax}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem">
          {profit}
        </Text>
      </Td>

    </Tr>
  );
}

export function DashboardTableRow6(props) {
  const { sale_id, Date, units_sold, sold_by, sold_to, total_price, amount_tendered, handleViewDetails } = props;
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Tr my=".8rem" ps="0px">
      <Td minWidth={{ sm: "100px" }} pl="0px">
        <Flex align="center" py=".3rem" minWidth="100%" flexWrap="nowrap">
          <Text
            fontSize="sm"
            color={textColor}
            fontWeight="bold"
            minWidth="100%"
          >
            {sale_id}
          </Text>
        </Flex>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem">
          {Date}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem">
          {units_sold}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem">
          {sold_by}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem">
          {sold_to}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem">
          {total_price}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem">
          20000
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem">
          20000
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem">
          {amount_tendered}
        </Text>
      </Td>

      <Td>
        <Center>
          <Button size='sm' variant='solid' backgroundColor='#5a8100' color='white' onClick={handleViewDetails}>
            View Receipt
          </Button>
        </Center>

      </Td>

    </Tr>
  );
}

export function DashboardTableRow5(props) {
  const { logo, name, quantity, date } = props;
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Tr>
      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Flex align="center" py=".2rem" minWidth="100%" flexWrap="nowrap">
          <Icon as={logo} color="green" h={"24px"} w={"24px"} pe="5px" />
          <Text
            fontSize="sm"
            color={textColor}
            fontWeight="bold"
            minWidth="100%"
          >
            {name}
            <Text>
              {date}
            </Text>
          </Text>
        </Flex>
      </Td>
      <Td textAlign='right'>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {quantity}
        </Text>
      </Td>
    </Tr>
  );
}

export function DashboardTableRow4(props) {
  const { name, category, wholesale, retail, tax_pct, quantity, onEditClick, onDeleteClick, onTrackClick } = props;
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
          {category}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem">
          {wholesale}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem">
          {retail}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem">
          {tax_pct}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem">
          {quantity}
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
            onClick={onEditClick}
            mx='1px'
          />
          <IconButton
            backgroundColor='red'
            color='white'
            borderRadius='0px'
            aria-label='delete sale'
            icon={<DeleteIcon />}
            onClick={onDeleteClick}
            mx='1px'
          />
          <IconButton
            backgroundColor='orange'
            color='white'
            borderRadius='0px'
            aria-label='delete sale'
            icon={<InfoIcon />}
            onClick={onTrackClick}
            mx='1px'
          />
        </Center>

      </Td>

    </Tr>
  );
}

export function DashboardTableRow3(props) {
  const { first_name, last_name, phone_no, email, total_purchased, onEditClick, onDeleteClick } = props;
  const textColor = "gray.500";
  return (
    <Tr my=".8rem" ps="0px">
      <Td minWidth={{ sm: "150px" }}>

          <Text
            fontSize="sm"
            color={"white"}
            fontWeight="bold"
            minWidth="100%"
            pb=".3rem"
          >
            {first_name}
          </Text>

      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem">
          {last_name}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem">
          {phone_no}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem">
          {email}
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
            aria-label='edit customer'
            icon={<EditIcon />}
            onClick={onEditClick}
            mx='2px'
          />
          <IconButton
            backgroundColor='red'
            color='white'
            aria-label='delete customer'
            icon={<DeleteIcon />}
            onClick={onDeleteClick}
            mx='2px'
          />
          <IconButton
            backgroundColor='#5a8100'
            color='white'
            aria-label='email customer'
            icon={<EmailIcon />}
            mx='2px'
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
