// Chakra imports
import {
    Box,
    Button,
    ButtonGroup,
    Center,
    Flex,
    Grid,
    Icon,
    SimpleGrid,
    Stat,
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
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import IconBox from "components/Icons/IconBox";
import { PersonIcon } from "components/Icons/Icons";
// Custom icons

import { DashboardTableRow2 } from "components/Tables/DashboardTableRow";
import TimelineRow from "components/Tables/TimelineRow";
import MyPaginate from "components/Pagination";
import React, { useState } from "react";
// react icons
import { TbCurrencyNaira, TbGitCompare } from 'react-icons/tb';
import { MdError, MdFilterList } from 'react-icons/md';
import { AiOutlineNumber, AiOutlineMacCommand } from 'react-icons/ai';
import { dashboardTableData5 } from "variables/general";
import { SalesOverviewData } from "variables/general2";


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
    // paginate state 
    const [itemOffset, setItemOffset] = useState(0);
    // 3 items per page 
    const itemsPerPage = 10;
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = dashboardTableData5.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(dashboardTableData5.length / itemsPerPage);
    // Chakra Color Mode
    const iconTeal = useColorModeValue("#ffb400", "#ffb400");
    const iconBoxInside = useColorModeValue("white", "white");
    const textColor = useColorModeValue("gray.700", "white");

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

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % dashboardTableData5.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };


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
                                    Total Units Sold (Feb 2023)
                                </StatLabel>
                                <Flex>
                                    <StatNumber fontSize="lg" color={textColor}>
                                        125
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
                                    Net Income (Amount)(Feb 2023)
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
                                    Total Sales (Amount)(Feb 2023)
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
                                ITEM SALES INVETORY (FEB 2023)
                            </Text>
                            <Flex align="center">
                                <ButtonGroup spacing='2' padding='2'>
                                    <Button leftIcon={<MdFilterList />} variant='solid' backgroundColor='#5a8100' color='white'>
                                        Filter
                                    </Button>
                                </ButtonGroup>
                            </Flex>
                        </Flex>
                    </CardHeader>
                    <Table variant="striped" color={textColor} size='sm'>
                        <Thead>
                            <Tr my=".8rem" ps="0px">
                                <Th ps="0px" color="gray.400">
                                    DATE
                                </Th>
                                <Th color="gray.400">NAME</Th>
                                <Th color="gray.400">UNITS SOLD</Th>
                                <Th color="gray.400">PRICE per UNIT</Th>
                                <Th color="gray.400">PRICE (TOTAL)</Th>
                                <Center>
                                    <Th color="gray.400">ACTIONS</Th>
                                </Center>


                            </Tr>
                        </Thead>
                        <Tbody>
                            {currentItems.map((row) => {
                                return (
                                    <DashboardTableRow2
                                        Date={row.Date}
                                        name={row.name}
                                        units_sold={row.units_sold}
                                        unit_price={row.unit_price}
                                        total_price={row.total_price}
                                    />
                                );
                            })}
                        </Tbody>
                    </Table>
                    <Box my="1.2rem">
                        <MyPaginate
                            breakLabel="..."
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            previousLabel="< previous"
                            renderOnZeroPageCount={null}
                        />
                    </Box>
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
                                Sales Overview
                            </Text>
                            <Text fontSize="sm" color="gray.400" fontWeight="normal">
                                <Text fontWeight="bold" as="span" color="#5A8100">
                                    +30%
                                </Text>{" "}
                                net profit than last month.
                            </Text>
                        </Flex>
                    </CardHeader>
                    <CardBody ps="20px" pe="0px" mb="31px" position="relative">
                        <Flex direction="column">
                            {SalesOverviewData.map((row, index, arr) => {
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
