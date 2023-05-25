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

import DashboardTableRow, { DashboardTableRow2 } from "components/Tables/DashboardTableRow";
import TimelineRow from "components/Tables/TimelineRow";
import React, { useState } from "react";
// react icons
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { TbCurrencyNaira, TbGitCompare } from 'react-icons/tb';
import { MdError } from 'react-icons/md'
import { dashboardTableData, dashboardTableData2, suspectedAirtimeData } from "variables/general";
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
            <Grid
                my="26px"
                mb={{ lg: "26px" }}
            >
                <Card p="16px">
                    <CardBody>
                        <Flex direction="column" w="100%">
                            <BarChart_1 height={{ sm: "200px", md: "300px", lg: "350px" }} options={AirtimeBarChartOptions} series={AirtimeBarChartData} />
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
                                    Transaction Success-Suspected Ratio by the Hour (Today)

                                </Text>
                                <Select w={"150px"}
                                            placeholder='Select Range'
                                        >
                                            <option value='today'>Today</option>
                                            <option value='l30'>Last 30 days</option>
                                            <option value='allTime'>All time</option>
                                            <option value='all'>All</option>
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
                templateColumns={{ sm: "1fr", lg: "1.3fr 1.7fr" }}
                templateRows={{ sm: "repeat(2, 1fr)", lg: "1fr" }}
                gap="24px"
                my="26px"
                mb={{ lg: "16px" }}
            >
                <Card p="16px">
                    <CardBody>
                        <Flex direction="column" w="100%">
                            <BarChart />
                            <Flex
                                direction="column"
                                mt="24px"
                                mb="36px"
                                alignSelf="flex-start"
                            >
                                <Text
                                    fontSize="lg"
                                    color={textColor}
                                    fontWeight="bold"
                                    mb="6px"
                                >
                                    Suspected Transactions each Month (2022)
                                </Text>
                                <Text fontSize="md" fontWeight="medium" color="gray.400">
                                    <Text as="span" color="green.400" fontWeight="bold">
                                        (+23%)
                                    </Text>{" "}
                                    than last Year
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
                                            Total
                                        </Text>
                                    </Flex>
                                    <Text
                                        fontSize="lg"
                                        color={textColor}
                                        fontWeight="bold"
                                        mb="6px"
                                        my="6px"
                                    >
                                        3.22m
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
                                            Succesful
                                        </Text>
                                    </Flex>
                                    <Text
                                        fontSize="lg"
                                        color={textColor}
                                        fontWeight="bold"
                                        mb="6px"
                                        my="6px"
                                    >
                                        2.42m
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
                                            Suspected
                                        </Text>
                                    </Flex>
                                    <Text
                                        fontSize="lg"
                                        color={textColor}
                                        fontWeight="bold"
                                        mb="6px"
                                        my="6px"
                                    >
                                        20.3k
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
                                            Ratio
                                        </Text>
                                    </Flex>
                                    <Text
                                        fontSize="lg"
                                        color={textColor}
                                        fontWeight="bold"
                                        mb="6px"
                                        my="6px"
                                    >
                                        0.23
                                    </Text>
                                </Flex>
                            </SimpleGrid>
                        </Flex>
                    </CardBody>
                </Card>
                <Card p="28px 10px 16px 0px" mb={{ sm: "26px", lg: "0px" }}>
                    <CardHeader mb="20px" pl="22px">
                        <Flex direction="column" alignSelf="flex-start">
                        <Flex alignItems="center">
                            <Text fontSize="lg" color={textColor} fontWeight="bold" mb="6px">
                                Violating Transactions per Network (Today)
                            </Text>
                            <Select w={"150px"}
                                            placeholder='Select Range'
                                        >
                                            <option value='today'>Today</option>
                                            <option value='l30'>Last 30 days</option>
                                            <option value='allTime'>All time</option>
                                            <option value='all'>All</option>
                                        </Select>
                            </Flex>
                            <Text fontSize="md" fontWeight="medium" color="gray.400">
                                <Text as="span" color="green.400" fontWeight="bold">
                                    (+5%) more
                                </Text>{" "}
                                than Yesterday
                            </Text>
                        </Flex>
                    </CardHeader>
                    <Box w="100%" h={{ sm: "300px" }} ps="8px">
                        <RadialBarChart options={AirtimeRadialChartOptions} series={AirtimeRadialChartData} />
                    </Box>
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
                                Top 5 Customers with Violations (By Total No. of violations)
                            </Text>
                            <Flex align="center">
                                <Text fontSize="sm" color="gray.400" fontWeight="normal">
                                    <Text fontWeight="bold" as="span">
                                        Filter
                                    </Text>{" "}
                                    <ButtonGroup spacing='2' padding='2'>
                                        <Button variant='solid' colorScheme='teal'>
                                            By Amount
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
                                    Name
                                </Th>
                                <Th color="gray.400">AirtelVTU</Th>
                                <Th color="gray.400">GloVTU</Th>
                                <Th color="gray.400">MtnVTU</Th>
                                <Th color="gray.400">EtisalatVTU</Th>
                                <Th color="gray.400">Transactions to Same Account</Th>
                                <Th color="gray.400">Total</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {dashboardTableData2.map((row) => {
                                return (
                                    <DashboardTableRow2
                                        name={row.name}
                                        AirtelVTU={row.AirtelVTU}
                                        GloVTU={row.GloVTU}
                                        MtnVTU={row.MtnVTU}
                                        EtisalatVTU={row.EtisalatVTU}
                                        ToSameAccount={row.ToSameAccount}
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
