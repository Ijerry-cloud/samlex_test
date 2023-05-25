// Chakra imports
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Grid,
  Icon,
  Image,
  Portal,
  Progress,
  Select,
  SimpleGrid,
  Spacer,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
// assets
import peopleImage from "assets/img/people-image.png";
import logoChakra from "assets/svg/logo-white.svg";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import RadialBarChart from "components/Charts/RadialBarChart";
import BarChart from "components/Charts/BarChart";
import { BarChart_1 } from "components/Charts/BarChart";
import { AirtimeBarChartData, AirtimeBarChartOptions, AirtimeRadialChartData, AirtimeRadialChartOptions } from "variables/charts";
import LineChart from "components/Charts/LineChart";
import IconBox from "components/Icons/IconBox";
import { PersonIcon } from "components/Icons/Icons";
// Custom icons
import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  RocketIcon,
  StatsIcon,
  WalletIcon,
} from "components/Icons/Icons.js";

import DashboardTableRow, { DashboardTableRow4 } from "components/Tables/DashboardTableRow";
import TimelineRow from "components/Tables/TimelineRow";
import React, { useState } from "react";
// react icons
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { TbCurrencyNaira, TbGitCompare } from 'react-icons/tb';
import { AiOutlineNumber, AiOutlineMacCommand } from 'react-icons/ai';
import { MdError } from 'react-icons/md'
import { dashboardTableData, dashboardTableData4, suspectedAirtimeData } from "variables/general";
//
import Filter from "components/Filter";
import Tables from "views/Dashboard/AirtimeSummaryChartPage";



const fields = [
  {
    id: 1,
    fieldName: 'merchant name',
    fieldType: 'text',
    isSelected: false,
    fieldQueryName: 'merchant_name',
    fieldValue: '',
  },
  {
    id: 2,
    fieldName: 'merchant id',
    fieldType: 'text',
    isSelected: false,
    fieldQueryName: 'merchant_id',
    fieldValue: '',
  },
  {
    id: 3,
    fieldName: 'range',
    fieldType: 'select',
    isSelected: false,
    fieldQueryName: 'range',
    children: [
      {
        id: 1,
        name: 'today',
        value: 'today'
      },
      {
        id: 2,
        name: 'last 30 days',
        value: 'l30'
      },
      {
        id: 3,
        name: 'all time',
        value: 'all_time'
      },
      {
        id: 4,
        name: 'all',
        value: 'all'
      },
    ],
    fieldValue: '',
  },
  {
    id: 4,
    fieldName: 'created at',
    fieldType: 'date',
    isSelected: false,
    fieldQueryName: 'created',
    fieldValue: '',
  }
]

export default function Dashboard() {
  const value = "$100.000";
  // Chakra Color Mode
  const { colorMode, toggleColorMode } = useColorMode();
  const iconTeal = useColorModeValue("teal.300", "teal.300");
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.700", "white");
  const [series, setSeries] = useState([
    {
      type: "area",
      name: "Mobile apps",
      data: [190, 220, 205, 350, 370, 450, 400, 360, 210, 250, 292, 150],
    },
    {
      type: "area",
      name: "Websites",
      data: [400, 291, 121, 117, 25, 133, 121, 211, 147, 25, 201, 203],
    },
  ]);
  const overlayRef = React.useRef();
  const [filters, setFilters] = useState(fields);

  const onItemSelected = (selectedField) => {

    const newFilter = filters.map(field => {
      // 👇️ if id equals 2, update country property
      if (field.id === selectedField.id) {
        return { ...field, isSelected: !field.isSelected };
      }

      // 👇️ otherwise return object as is
      return field;
    });

    setFilters(newFilter);
  }

  const handleChange = (event, selectedField) => {

    const { name, value } = event.target;
    const newFilter = filters.map(field => {
      // 👇️ if id equals 2, update country property
      if (field.id === selectedField.id) {
        return { ...field, fieldValue: value };
      }

      // 👇️ otherwise return object as is
      return field;
    });

    setFilters(newFilter);
  }

  const fireOnSearch = () => {
    let urlAndFilter = initializeUrlWithFilters(GET_MERCHANT_SUMMARIES + `?page=${page}`, filters);
    // once the url string changes, the useQuery hook will fire again
    setUrlWithFilters(urlAndFilter);
  }

  const closeFilterBox = () => {
    setUrlWithFilters('');
    const closedFilters = filters.map(filter => {
      return { ...filter, isSelected: false, fieldValue: '' }
    })
    setFilters(closedFilters);
  }


  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
        <Card minH="83px">
          <CardBody>
            <Flex flexDirection="row" align="center" justify="center" w="100%">
              <Stat me="auto">
                <StatLabel
                  fontSize="sm"
                  color="gray.400"
                  fontWeight="bold"
                  pb=".1rem"
                >
                  Total Violations (Count)
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color={textColor}>
                    1322
                  </StatNumber>
                  {/* <StatHelpText
                    alignSelf="flex-end"
                    justifySelf="flex-end"
                    m="0px"
                    color="green.400"
                    fontWeight="bold"
                    ps="3px"
                    fontSize="md"
                  >
                    +55%
                  </StatHelpText> */}
                </Flex>
              </Stat>
              <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
                <Icon h={"35px"} w={"35px"} as={AiOutlineNumber} color='#fff' />
              </IconBox>
            </Flex>
          </CardBody>
        </Card>
        <Card minH="83px">
          <CardBody>
            <Flex flexDirection="row" align="center" justify="center" w="100%">
              <Stat me="auto">
                <StatLabel
                  fontSize="sm"
                  color="gray.400"
                  fontWeight="bold"
                  pb=".1rem"
                >
                  Total Violations (Merchants)
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color={textColor}>
                    45
                  </StatNumber>
                  {/* <StatHelpText
                    alignSelf="flex-end"
                    justifySelf="flex-end"
                    m="0px"
                    color="green.400"
                    fontWeight="bold"
                    ps="3px"
                    fontSize="md"
                  >
                    +5%
                  </StatHelpText> */}
                </Flex>
              </Stat>
              <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
                <PersonIcon h={"24px"} w={"24px"} color={iconBoxInside} />
              </IconBox>
            </Flex>
          </CardBody>
        </Card>
        <Card minH="83px">
          <CardBody>
            <Flex flexDirection="row" align="center" justify="center" w="100%">
              <Stat me="auto">
                <StatLabel
                  fontSize="sm"
                  color="gray.400"
                  fontWeight="bold"
                  pb=".1rem"
                >
                  Total Violations (Naira)
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color={textColor}>
                    3,020,009
                  </StatNumber>
                  {/* <StatHelpText
                    alignSelf="flex-end"
                    justifySelf="flex-end"
                    m="0px"
                    color="red.500"
                    fontWeight="bold"
                    ps="3px"
                    fontSize="md"
                  >
                    -14%
                  </StatHelpText> */}
                </Flex>
              </Stat>
              <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
                <Icon h={"35px"} w={"35px"} as={TbCurrencyNaira} color='#fff' />
              </IconBox>
            </Flex>
          </CardBody>
        </Card>
        <Card minH="83px">
          <CardBody>
            <Flex flexDirection="row" align="center" justify="center" w="100%">
              <Stat me="auto">
                <StatLabel
                  fontSize="sm"
                  color="gray.400"
                  fontWeight="bold"
                  pb=".1rem"
                >
                  Total Violations (Rules)
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
                    9
                  </StatNumber>
                  {/* <StatHelpText
                    alignSelf="flex-end"
                    justifySelf="flex-end"
                    m="0px"
                    color="green.400"
                    fontWeight="bold"
                    ps="3px"
                    fontSize="md"
                  >
                    +8%
                  </StatHelpText> */}
                </Flex>
              </Stat>
              <IconBox as="box" h={"45px"} w={"45px"} bg={iconTeal}>
                <Icon h={"35px"} w={"35px"} as={AiOutlineMacCommand} color='#fff' />
              </IconBox>
            </Flex>
          </CardBody>
        </Card>
      </SimpleGrid>
      <Grid
        my="26px"
        mb={{ lg: "26px" }}
      >
        <Card p="16px">
          <CardBody>
            <Flex direction="column" w="100%">
              <Card
                py="1rem"
                height={{sm: "300px"}}
                width="100%"
                bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
                position="relative"
              >
                <LineChart />
              </Card>
              <Flex
                direction="column"
                mt="24px"
                mb="36px"
                alignSelf="flex-start"
              >
                <Flex alignItems="center">
                  <Text
                    fontSize="lg"
                    color={textColor}
                    fontWeight="bold"
                    mb="6px"
                  >
                    Transaction Success-Suspected Ratio per month (2023)

                  </Text>
                  <Select w={"150px"}
                    placeholder='Select Range'
                  >
                    <option value='today'>Last year</option>
                    <option value='l30'>2021</option>
                    <option value='allTime'>2020</option>
                    <option value='all'>All Time</option>
                  </Select>
                </Flex>
                <Text fontSize="md" fontWeight="medium" color="gray.400">
                  <Text as="span" color="green.400" fontWeight="bold">
                    (+23%)
                  </Text>{" "}
                  than last week
                </Text>
              </Flex>
              <SimpleGrid gap={{ sm: "12px" }} columns={4}>
                <Flex direction="column">
                  <Flex alignItems="center">
                    <IconBox
                      as="box"
                      h={"30px"}
                      w={"30px"}
                      bg={iconTeal}
                      me="6px"
                    >
                      <Icon as={TbCurrencyNaira} color='#fff' />
                    </IconBox>
                    <Text fontSize="sm" color="gray.400" fontWeight="semibold">
                      Total Transactions
                    </Text>
                  </Flex>
                  <Text
                    fontSize="lg"
                    color={textColor}
                    fontWeight="bold"
                    mb="6px"
                    my="6px"
                  >
                    1.3m
                  </Text>
                </Flex>
                <Flex direction="column">
                  <Flex alignItems="center">
                    <IconBox
                      as="box"
                      h={"30px"}
                      w={"30px"}
                      bg={iconTeal}
                      me="6px"
                    >
                      <Icon as={IoCheckmarkDoneCircleSharp} color='#fff' />
                    </IconBox>
                    <Text fontSize="sm" color="gray.400" fontWeight="semibold">
                      Succesful Transactions
                    </Text>
                  </Flex>
                  <Text
                    fontSize="lg"
                    color={textColor}
                    fontWeight="bold"
                    mb="6px"
                    my="6px"
                  >
                    444.4k
                  </Text>
                </Flex>
                <Flex direction="column">
                  <Flex alignItems="center">
                    <IconBox
                      as="box"
                      h={"30px"}
                      w={"30px"}
                      bg={iconTeal}
                      me="6px"
                    >
                      <Icon as={MdError} color='#fff' />
                    </IconBox>
                    <Text fontSize="sm" color="gray.400" fontWeight="semibold">
                      Suspected Transactions
                    </Text>
                  </Flex>
                  <Text
                    fontSize="lg"
                    color={textColor}
                    fontWeight="bold"
                    mb="6px"
                    my="6px"
                  >
                    34k
                  </Text>
                </Flex>
                <Flex direction="column">
                  <Flex alignItems="center">
                    <IconBox
                      as="box"
                      h={"30px"}
                      w={"30px"}
                      bg={iconTeal}
                      me="6px"
                    >
                      <Icon as={TbGitCompare} color='#fff' />
                    </IconBox>
                    <Text fontSize="sm" color="gray.400" fontWeight="semibold">
                      Violation Rate
                    </Text>
                  </Flex>
                  <Text
                    fontSize="lg"
                    color={textColor}
                    fontWeight="bold"
                    mb="6px"
                    my="6px"
                  >
                    0.655
                  </Text>
                </Flex>
              </SimpleGrid>
            </Flex>
          </CardBody>
        </Card>
      </Grid>
      <Grid
        my="26px"
        mb={{ lg: "16px" }}
      >
        <Card p="16px" overflowX={{ sm: "scroll", xl: "hidden" }}>
          <CardHeader p="12px 0px 28px 0px">
            <Flex direction="column">
              <Text
                fontSize="lg"
                color={textColor}
                fontWeight="bold"
                pb=".5rem"
              >
                Top 5 Customers with Violations (By Amount)
              </Text>
              <Flex align="center">
                <Text fontSize="sm" color="gray.400" fontWeight="normal">
                  <Text fontWeight="bold" as="span">
                    Filter
                  </Text>{" "}
                  <ButtonGroup spacing='2' padding='2'>
                    <Button variant='solid' colorScheme='teal'>
                      By No. of Violations
                    </Button>
                  </ButtonGroup>
                  <ButtonGroup spacing='2' padding='2'>
                    <Button variant='solid' colorScheme='teal'>
                      View Full List
                    </Button>
                  </ButtonGroup>
                </Text>
              </Flex>
            </Flex>
          </CardHeader>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" ps="0px">
                <Th ps="0px" color="gray.400">
                  Merchant ID
                </Th>
                <Th color="gray.400">Max Limit</Th>
                <Th color="gray.400">Chargeback</Th>
                <Th color="gray.400">Above Limit</Th>
                <Th color="gray.400">Total (NGN)</Th>
              </Tr>
            </Thead>
            <Tbody>
              {dashboardTableData4.map((row) => {
                return (
                  <DashboardTableRow4
                  Merchant_ID={row.Merchant_ID}
                  Max_Limit={row.Max_Limit}
                  Charge_back={row.Charge_back}
                  Above_Limit={row.Above_Limit}
                    Total={row.Total}
                  />
                );
              })}
            </Tbody>
          </Table>
        </Card>
      </Grid>
      <Grid
        my="26px"
        mb={{ lg: "16px" }}
      >
        <Card maxH="100%">
          <CardHeader p="22px 0px 35px 14px">
            <Flex direction="column">
              <Text
                fontSize="lg"
                color={textColor}
                fontWeight="bold"
                pb=".5rem"
              >
                Transaction Overview
              </Text>
              <Text fontSize="sm" color="gray.400" fontWeight="normal">
                <Text fontWeight="bold" as="span" color="teal.300">
                  +30%
                </Text>{" "}
                this month.
              </Text>
            </Flex>
          </CardHeader>
          <CardBody ps="20px" pe="0px" mb="31px" position="relative">
            <Flex direction="column">
              {suspectedAirtimeData.map((row, index, arr) => {
                return (
                  <TimelineRow
                    logo={row.logo}
                    title={row.title}
                    date={row.date}
                    color={row.color}
                    index={index}
                    arrLength={arr.length}
                  />
                );
              })}
            </Flex>
          </CardBody>
        </Card>
      </Grid>
    </Flex>
  );
}
