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
    Spinner,
    Stat,
    StatLabel,
    StatNumber,
    Table,
    Tbody,
    Text,
    Th,
    Thead,
    Tr,
    useDisclosure,
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
import { GET_CREATE_SALES } from "config/serverUrls";
import { fetchData } from 'modules/utilities/util_query';
import { useQuery } from 'react-query';
import { handleApiError } from "modules/utilities/responseHandlers";
import { useSelector } from 'react-redux';
import { getAuthToken } from 'modules/auth/redux/authSelector';


export default function Dashboard() {
    const token = useSelector(getAuthToken);
    const [values, setValues] = React.useState({});
    const [sales, setSales] = React.useState([]);

    const [count, setCount] = React.useState(0);
    const [pageCount, setPageCount] = useState(1);
    const [page, setPage] = useState(1);
    const textColor = "white";

    const { isOpen, onOpen, onClose } = useDisclosure();

    const onModalClose = () => {

        onClose();
    }

    const payload_data = {};

    const result = useQuery(['my sales',
        {
            url: GET_CREATE_SALES + `?page=${page}`,
            payload_data,
            authenticate: true,
            token
        }],
        fetchData,
        {
            retry: false,
            onSuccess: (response) => {
                const data = response?.data;
                setCount(data?.count || 0);
                setSales(data?.results || []);
                setPageCount(data?.last_page || 1);
                console.log(data?.results);
            },
            onError: (error) => {
                handleApiError(error);
            }
        }
    );

    const { isLoading, refetch } = result;

    const handlePageChange = (evt) => {

        const { selected } = evt;
        setPage(selected + 1);
        window.scrollTo(0, 0); // moves the compoent to the top of the page
    }

    if (isLoading) {
        return (
            <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
                <Center>
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    />
                </Center>
            </Flex>
        )
    }

    return (
        <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
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
                        </Flex>
                    </CardHeader>
                    <Table variant="unstyled" color={textColor} size='sm'>
                        <Thead>
                            <Tr my=".8rem" ps="0px">
                                <Th ps="0px" color="gray.400">
                                    DATE
                                </Th>
                                <Th color="gray.400">SOLD BY</Th>
                                <Th color="gray.400">SOLD TO</Th>
                                <Th color="gray.400">UNITS SOLD</Th>
                                <Th color="gray.400">SUB-TOTAL</Th>
                                <Th color="gray.400">DISCOUNT</Th>
                                <Th color="gray.400">TOTAL</Th>
                                <Th color="gray.400">PAYMENT TYPE</Th>
                                <Center>
                                    <Th color="gray.400">ACTIONS</Th>
                                </Center>


                            </Tr>
                        </Thead>
                        <Tbody>
                            {sales.map((row, index) => {
                                const jsDate = new Date(row.date);
                                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                                const formattedDate = jsDate.toLocaleDateString('en-US', options);

                                return (
                                    <DashboardTableRow2
                                        key = {index}
                                        Date={formattedDate}
                                        employee_name = {row.employee_name}
                                        customer_name = {row.customer_name}
                                        sum_items = {row.sum_items}
                                        sub_total = {row.sub_total}
                                        discount = {row.discount}
                                        payment_type = {row.payment_type}
                                        paid_cash = {row.paid_cash}
                                        
                                    />
                                );
                            })}
                        </Tbody>
                    </Table>
                    <Box my="1.2rem">
                            <MyPaginate
                                breakLabel="..."
                                nextLabel=">"

                                pageRangeDisplayed={5}

                                previousLabel="<"

                                pageCount={pageCount}
                                onPageChange={(e) => { handlePageChange(e) }}
                                forcePage={pageCount > 1 ? page - 1 : 1}
                                renderOnZeroPageCount={null}
                                activeClassName={'active'}
                            />
                        </Box>
                </Card>
            </Grid>
        </Flex>
    );
}
