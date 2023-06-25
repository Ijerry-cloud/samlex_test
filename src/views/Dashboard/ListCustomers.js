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

import { DashboardTableRow3 } from "components/Tables/DashboardTableRow";
import TimelineRow from "components/Tables/TimelineRow";
import MyPaginate from "components/Pagination";
import React, { useState } from "react";
// react icons
import { TbCurrencyNaira, TbGitCompare } from 'react-icons/tb';
import { MdError, MdFilterList } from 'react-icons/md';
import { AiOutlineNumber, AiOutlineMacCommand } from 'react-icons/ai';
import { dashboardTableData4 } from "variables/general";
import { SalesOverviewData } from "variables/general2";


export default function Dashboard() {
    const value = "$100.000";
    // paginate state 
    const [itemOffset, setItemOffset] = useState(0);
    // 3 items per page 
    const itemsPerPage = 10;
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = dashboardTableData4.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(dashboardTableData4.length / itemsPerPage);
    // Chakra Color Mode
    const iconTeal = useColorModeValue("#ffb400", "#ffb400");
    const iconBoxInside = useColorModeValue("white", "white");
    const textColor = useColorModeValue("gray.700", "white");


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
            <SimpleGrid columns={{ sm: 1, md: 2, xl: 2 }} spacing="24px">
                <Card minH="83px" w="100%">
                    <CardBody>
                        <Flex flexDirection="row" align="center" justify="center" w="100%">
                            <Stat me="auto">
                                <StatLabel
                                    fontSize="sm"
                                    color="gray.400"
                                    fontWeight="bold"
                                    pb=".1rem"
                                >
                                    Total Number of Customers (Feb 2023)
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
                <Card minH="83px" w="100%">
                    <CardBody>
                        <Flex flexDirection="row" align="center" justify="center" w="100%">
                            <Stat me="auto">
                                <StatLabel
                                    fontSize="sm"
                                    color="gray.400"
                                    fontWeight="bold"
                                    pb=".1rem"
                                >
                                    Number of new customers (This Month)
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
                                CUSTOMERS LISTINGS (FEB 2023)
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
                                <Th color="gray.400">NAME</Th>
                                <Th color="gray.400"> PHONE NUMBER </Th>
                                <Th color="gray.400">EMAIL ADDRESS</Th>
                                <Th color="gray.400">PRICE PURCHASED (TOTAL)</Th>
                                <Center>
                                    <Th color="gray.400">ACTIONS</Th>
                                </Center>


                            </Tr>
                        </Thead>
                        <Tbody>
                            {currentItems.map((row) => {
                                return (
                                    <DashboardTableRow3
                                        name={row.name}
                                        phone_no={row.phone_no}
                                        email_address={row.email_address}
                                        total_purchased={row.total_purchased}
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
        </Flex>
    );
}
