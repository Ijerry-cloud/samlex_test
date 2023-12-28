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
import { EmailIcon, DeleteIcon, EditIcon, DownloadIcon, InfoIcon, CheckCircleIcon, WarningTwoIcon } from '@chakra-ui/icons'
import { RiAdminLine, RiStackLine } from "react-icons/ri";
import { FaCalendarAlt } from "react-icons/fa";
import { AiFillWarning } from "react-icons/ai";

import avatar7 from "assets/img/avatars/male.jpg";
import avatar8 from "assets/img/avatars/female.png";

export function DashboardTableRow14(props) {
  const { first_name, last_name, phone_no, email, city, onEditClick, onDeleteClick } = props;
  const textColor = "gray.500";
  return (
    <Tr my=".8rem" borderBottom="4px" borderColor="#232333">
      <Td minWidth={{ sm: "100px" }} maxWidth={{ sm: "200px" }} fontSize="sm" color="gray.500" fontWeight="bold" mx={0}>
        {first_name}
      </Td>

      <Td minWidth={{ sm: "100px" }} maxWidth={{ sm: "200px" }} fontSize="sm" color="gray.500" fontWeight="bold" mx={0}>
        {last_name}
      </Td>

      <Td minWidth={{ sm: "100px" }} fontSize="sm" color="gray.500" fontWeight="bold" mx={0}>
        {phone_no}
      </Td>

      <Td minWidth={{ sm: "100px" }} fontSize="sm" color="gray.500" fontWeight="bold" mx={0}>
        {email}
      </Td>
      <Td minWidth={{ sm: "100px" }} fontSize="sm" color="gray.500" fontWeight="bold" mx={0}>
        {city}
      </Td>

      <Td textAlign="center">

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

      </Td>

    </Tr>
  );
}

export function DashboardTableRow13(props) {
  const { name, category, cost_price, unit_price, quantity, onTrackClick } = props;
  const textColor = "gray.500";
  return (
    <Tr my=".8rem" ps="0px">
      <Td minWidth={{ sm: "150px" }} pl="0px">
        <Flex align="center" py=".3rem" minWidth="100%" flexWrap="nowrap">
          <Text
            fontSize="sm"
            color="white"
            fontWeight="bold"
            minWidth="100%"
          >
            {name}
          </Text>
        </Flex>
      </Td>

      <Td>
        <Text textTransform="uppercase" fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem">
          {category || "--------"}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem" textAlign="right">
          {cost_price}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem" textAlign="right">
          {unit_price}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem" textAlign="right">
          {quantity}
        </Text>
      </Td>

      <Td textAlign="right">
        <IconButton
          backgroundColor='orange'
          color='white'
          aria-label='delete sale'
          icon={<InfoIcon />}
          onClick={onTrackClick}
        />

      </Td>

    </Tr>
  );
}

export function DashboardTableRow12(props) {
  const { Date, no_of_sales, total_amount, total_qty } = props;
  const textColor = "white";
  return (
    <Tr my=".8rem" borderBottom="4px" borderColor="#232333">
      <Td minWidth={{ sm: "100px" }} fontSize="sm" color="gray.500" fontWeight="bold" px={2} mx={0}>
        {Date}
      </Td>

      <Td textAlign="right" fontSize="sm" color={textColor} fontWeight="bold" px={2} mx={0}>
        {no_of_sales}
      </Td>

      <Td textAlign="right" minWidth={{ sm: "150px" }} pl="0px" px={2} mx={0}>
        <Flex align="center" py=".3rem" minWidth="100%" flexWrap="nowrap">
          <Text
            fontSize="sm"
            color="white"
            fontWeight="bold"
            minWidth="100%"
          >
            {total_qty}
          </Text>
        </Flex>
      </Td>
      <Td textAlign="right" fontSize="sm" color={textColor} fontWeight="bold" px={2} mx={0}>
        {total_amount}
      </Td>
    </Tr>
  );
}



export function DashboardTableRow11(props) {
  const { username, firstName, lastName, dept, emailAddress, gender, onEditClick, onDeleteClick } = props;
  const textColor = "gray.500";
  return (
    <Tr>

      <Td align="center" display="flex" alignItems="center" minWidth={{ sm: "100px" }} maxWidth={{ sm: "200px" }} fontSize="sm" color="gray.500" fontWeight="bold">
        <Avatar
          src={gender == "female" ? avatar8 : avatar7}
          w="50px"
          h="50px"
          me="10px"
        />
        <Text
          fontSize="sm"
          color={"white"}
          fontWeight="bold"
          maxWidth="80%"
          flexShrink={0}  // Prevent the Text from shrinking
          overflow="hidden"
        >
          {username}
        </Text>
      </Td>
      <Td minWidth={{ sm: "100px" }} maxWidth={{ sm: "200px" }} fontSize="sm" color="gray.500" fontWeight="bold">
        {firstName}
      </Td>
      <Td minWidth={{ sm: "100px" }} maxWidth={{ sm: "200px" }} fontSize="sm" color="gray.500" fontWeight="bold">
        {dept}
      </Td>
      <Td minWidth={{ sm: "100px" }} maxWidth={{ sm: "200px" }} fontSize="sm" color="gray.500" fontWeight="bold">
        {emailAddress}
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
  const { name, no_of_sales, total_paid, total_amount, total_qty } = props;
  const textColor = "white";
  return (
    <Tr my=".8rem" borderBottom="4px" borderColor="#232333">
      <Td minWidth={{ sm: "100px" }} fontSize="sm" color="gray.500" fontWeight="bold" px={2} mx={0}>
        {name}
      </Td>

      <Td textAlign="right" fontSize="sm" color={textColor} fontWeight="bold" px={2} mx={0}>
        {no_of_sales}
      </Td>

      <Td textAlign="right" minWidth={{ sm: "150px" }} pl="0px" px={2} mx={0}>
        <Flex align="center" py=".3rem" minWidth="100%" flexWrap="nowrap">
          <Text
            fontSize="sm"
            color="white"
            fontWeight="bold"
            minWidth="100%"
          >
            {total_qty}
          </Text>
        </Flex>
      </Td>
      <Td textAlign="right" fontSize="sm" color={textColor} fontWeight="bold" px={2} mx={0}>
        {total_amount}
      </Td>
      <Td textAlign="right" fontSize="sm" color={textColor} fontWeight="bold" px={2} mx={0}>
        {total_paid}
      </Td>
    </Tr>
  );
}

export function DashboardTableRow9(props) {
  const { name, qty } = props;
  const textColor = "white";
  return (
    <Tr my=".8rem" borderBottom="4px" borderColor="#232333">
      <Td minWidth={{ sm: "100px" }} fontSize="sm" color="gray.500" fontWeight="bold" px={2} mx={0}>
        {name}
      </Td>

      <Td textAlign="right" fontSize="sm" color={textColor} fontWeight="bold" px={2} mx={0}>
        {qty <= 0 ? <WarningTwoIcon
          color='red'
          mx='2px'
          boxSize={4}
        /> :
          <CheckCircleIcon
            color='#7FC92F'
            mx='2px'
            boxSize={4}
          />}

      </Td>
      <Td textAlign="right" fontSize="sm" color={textColor} fontWeight="bold" px={2} mx={0}>
        {qty}
      </Td>
    </Tr>
  );
}


export function DashboardTableRow8(props) {
  const { name, no_of_purchases, total_paid, total_amount, total_qty } = props;
  const textColor = "white";
  return (
    <Tr my=".8rem" borderBottom="4px" borderColor="#232333">
      <Td minWidth={{ sm: "100px" }} fontSize="sm" color="gray.500" fontWeight="bold" px={2} mx={0}>
        {name}
      </Td>

      <Td textAlign="right" fontSize="sm" color={textColor} fontWeight="bold" px={2} mx={0}>
        {no_of_purchases}
      </Td>

      <Td textAlign="right" minWidth={{ sm: "150px" }} pl="0px" px={2} mx={0}>
        <Flex align="center" py=".3rem" minWidth="100%" flexWrap="nowrap">
          <Text
            fontSize="sm"
            color="white"
            fontWeight="bold"
            minWidth="100%"
          >
            {total_qty}
          </Text>
        </Flex>
      </Td>
      <Td textAlign="right" fontSize="sm" color={textColor} fontWeight="bold" px={2} mx={0}>
        {total_amount}
      </Td>
      <Td textAlign="right" fontSize="sm" color={textColor} fontWeight="bold" px={2} mx={0}>
        {total_paid}
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
  const { logo, name, amount_added, date } = props;
  const textColor = "white";
  return (
    <Tr>
      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Flex align="center" py=".2rem" minWidth="100%" flexWrap="nowrap">
          <Icon as={RiStackLine} color="#4285f4" h={"24px"} w={"24px"} pe="5px" />
          <Text
            fontSize="lg"
            color={textColor}
            fontWeight="bold"
            minWidth="100%"
          >
            {name}
            <Text color="gray.400" fontSize="sm">
              {date}
            </Text>
          </Text>
        </Flex>
      </Td>
      <Td textAlign='right'>
        <Text fontSize="md" color="#4285f4" fontWeight="bold" pb=".5rem">
          {amount_added}
        </Text>
      </Td>
    </Tr>
  );
}

export function DashboardTableRow4(props) {
  const { name, category, cost_price, unit_price, quantity, onEditClick, onDeleteClick, onTrackClick } = props;
  const textColor = "gray.500";
  return (
    <Tr my=".8rem" ps="0px">
      <Td minWidth={{ sm: "150px" }} pl="0px">
        <Flex align="center" py=".3rem" minWidth="100%" flexWrap="nowrap">
          <Text
            fontSize="sm"
            color="white"
            fontWeight="bold"
            minWidth="100%"
          >
            {name}
          </Text>
        </Flex>
      </Td>

      <Td>
        <Text textTransform="uppercase" fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem">
          {category || "--------"}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem" textAlign="right">
          {cost_price}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem" textAlign="right">
          {unit_price}
        </Text>
      </Td>

      <Td>
        <Text fontSize="sm" color={textColor} fontWeight="bold" pb=".3rem" textAlign="right">
          {quantity}
        </Text>
      </Td>

      <Td>
        <Center>
          <IconButton
            backgroundColor='blue'
            color='white'
            aria-label='edit sale'
            icon={<EditIcon />}
            onClick={onEditClick}
            mx='2px'
          />
          <IconButton
            backgroundColor='red'
            color='white'
            aria-label='delete sale'
            icon={<DeleteIcon />}
            onClick={onDeleteClick}
            mx='2px'
          />
          <IconButton
            backgroundColor='orange'
            color='white'
            aria-label='delete sale'
            icon={<InfoIcon />}
            onClick={onTrackClick}
            mx='2px'
          />
        </Center>

      </Td>

    </Tr>
  );
}

export function DashboardTableRow3(props) {
  const { company_name, first_name, last_name, phone_no, email, onEditClick, onDeleteClick } = props;
  const textColor = "gray.500";
  return (
    <Tr my=".8rem" borderBottom="4px" borderColor="#232333">
      <Td minWidth={{ sm: "100px" }} maxWidth={{ sm: "200px" }} fontSize="sm" color="gray.500" fontWeight="bold" mx={0}>
        {company_name}
      </Td>

      <Td minWidth={{ sm: "100px" }} maxWidth={{ sm: "200px" }} fontSize="sm" color="gray.500" fontWeight="bold" mx={0}>
        {first_name}
      </Td>

      <Td minWidth={{ sm: "100px" }} fontSize="sm" color="gray.500" fontWeight="bold" mx={0}>
        {last_name}
      </Td>

      <Td minWidth={{ sm: "100px" }} fontSize="sm" color="gray.500" fontWeight="bold" mx={0}>
        {phone_no}
      </Td>
      <Td minWidth={{ sm: "100px" }} fontSize="sm" color="gray.500" fontWeight="bold" mx={0}>
        {email}
      </Td>

      <Td textAlign="right">

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

      </Td>

    </Tr>
  );
}

export function DashboardTableRow2(props) {
  const { Date, employee_name, customer_name, sum_items, sub_total, discount, paid_cash, payment_type,
    onViewClick, onDeleteClick } = props;
  const textColor = "gray.500";
  return (
    <Tr my=".8rem">
      <Td minWidth={{ sm: "100px" }} fontSize="sm" color={textColor} fontWeight="bold" px={2} mx={0}>
        {Date}
      </Td>

      <Td fontSize="sm" color={textColor} fontWeight="bold" px={2} mx={0}>
        {employee_name}
      </Td>

      <Td minWidth={{ sm: "150px" }} pl="0px" px={2} mx={0}>
        <Flex align="center" py=".3rem" minWidth="100%" flexWrap="nowrap">
          <Text
            fontSize="sm"
            color="white"
            fontWeight="bold"
            minWidth="100%"
          >
            {customer_name}
          </Text>
        </Flex>
      </Td>

      <Td isNumeric maxWidth={{ sm: "70px" }} fontSize="sm" color={textColor} fontWeight="bold" textAlign="right" px={2} mx={0}>
        {sum_items}
      </Td>

      <Td isNumeric fontSize="sm" color={textColor} fontWeight="bold" textAlign="right" px={2} mx={0}>
        {sub_total}
      </Td>
      <Td isNumeric fontSize="sm" color={textColor} fontWeight="bold" textAlign="right" px={2} mx={0}>
        {discount}
      </Td>
      <Td isNumeric fontSize="sm" color={textColor} fontWeight="bold" textAlign="right" px={2} mx={0}>
        {Number(sub_total - discount).toFixed(2)}
      </Td>
      <Td fontSize="sm" color={textColor} fontWeight="bold" textAlign="right" px={2} mx={0}>
        {paid_cash}
      </Td>

      <Td px={2} mx={0}>
        <Center>
          <Button size='sm' colorScheme="blue" onClick={onViewClick}>
            View Receipt
          </Button>
          <IconButton
            backgroundColor='red'
            color='white'
            aria-label='delete customer'
            icon={<DeleteIcon />}
            onClick={onDeleteClick}
            mx='2px'
          />

        </Center>

      </Td>

    </Tr>
  );
}

function DashboardTableRow(props) {
  const { Date, employee_name, customer_name, sub_total } = props;
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Tr>
      <Td minWidth={{ sm: "150px" }} pl="0px">
        <Text
          fontSize="md"
          color="gray.500"
          fontWeight="bold"
          minWidth="100%"
        >
          {Date}
        </Text>
      </Td>

      <Td>
        <Text
          fontSize="md"
          color="gray.500"
          fontWeight="bold"
          minWidth="100%"
        >
          {employee_name}
        </Text>
      </Td>
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          <Text
            fontSize="md"
            color="white"
            fontWeight="bold"
            minWidth="100%"
          >
            {customer_name}
          </Text>
        </Text>
      </Td>
      <Td textAlign="right">
        <Text
          fontSize="md"
          color="gray.500"
          fontWeight="bold"
          minWidth="100%"
        >
          {sub_total}
        </Text>
      </Td>
    </Tr>
  );
}

export default DashboardTableRow;
